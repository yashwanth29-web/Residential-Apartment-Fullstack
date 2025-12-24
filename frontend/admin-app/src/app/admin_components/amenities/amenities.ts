import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { ApiService } from '../../services/api.service';

@Component({
   standalone: true,
  selector: 'app-amenities',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './amenities.html',
  styleUrl: './amenities.css',
})
export class Amenities implements OnInit {

   amenities: any[] = [];
  form = {
    name: '',
    description: '',
    image: '',
    tower_id: 1
  };

  constructor(public api: ApiService) {}

  ngOnInit(): void {
    this.loadAmenities();
  }

  loadAmenities(): void {
    this.api.getAdminAmenities().subscribe((res: any) => {
      this.amenities = res;
    });
  }

  addAmenity(): void {
    this.api.addAmenity(this.form).subscribe(() => {
      alert('Amenity added');
      this.form = { name: '', description: '', image: '', tower_id: 1 };
      this.loadAmenities();
    });
  }

editAmenity: any = null;

edit(a: any) {
  this.editAmenity = { ...a };
}

saveEdit() {
  this.api.updateAmenity(this.editAmenity.id, this.editAmenity)
    .subscribe(() => {
      alert('Amenity updated');
      this.editAmenity = null;
      this.loadAmenities();
    });
}

delete(id: number) {
  if (confirm('Are you sure?')) {
    this.api.deleteAmenity(id).subscribe(() => {
      alert('Amenity deleted');
      this.loadAmenities();
    });
  }
}



}
