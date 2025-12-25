import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Navbar } from '../navbar/navbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-amenities',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './amenities.html',
  styleUrl: './amenities.css',
})
export class Amenities implements OnInit {
  amenities: any[] = [];
  towers: any[] = [];
  form = {
    name: '',
    description: '',
    image: '',
    tower_name: ''
  };
  editAmenity: any = null;

  constructor(public api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadAmenities();
    this.loadTowers();
  }

  loadTowers(): void {
    this.api.getTowers().subscribe({
      next: (res: any) => {
        this.towers = res;
      },
      error: () => {}
    });
  }

  loadAmenities(): void {
    this.api.getAdminAmenities().subscribe({
      next: (res: any) => {
        this.amenities = res;
      },
      error: () => {
        this.toastr.error('Failed to load amenities', 'Error');
      }
    });
  }

  addAmenity(): void {
    if (!this.form.name) {
      this.toastr.warning('Please enter amenity name', 'Validation');
      return;
    }

    this.api.addAmenity(this.form).subscribe({
      next: () => {
        this.toastr.success('Amenity added', 'Success');
        this.form = { name: '', description: '', image: '', tower_name: '' };
        this.loadAmenities();
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to add amenity', 'Error');
      }
    });
  }

  edit(a: any) {
    this.editAmenity = { ...a };
  }

  saveEdit() {
    this.api.updateAmenity(this.editAmenity.id, this.editAmenity).subscribe({
      next: () => {
        this.toastr.success('Amenity updated', 'Success');
        this.editAmenity = null;
        this.loadAmenities();
      },
      error: () => {
        this.toastr.error('Failed to update amenity', 'Error');
      }
    });
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.api.deleteAmenity(id).subscribe({
        next: () => {
          this.toastr.success('Amenity deleted', 'Success');
          this.loadAmenities();
        },
        error: () => {
          this.toastr.error('Failed to delete amenity', 'Error');
        }
      });
    }
  }
}
