import { Component , OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
 
  standalone: true,
  selector: 'app-leases',
  imports: [ CommonModule, FormsModule, Navbar],
  templateUrl: './leases.html',
  styleUrl: './leases.css',
})
export class Leases implements OnInit {

  leases: any[] = [];

  form = {
    Booking_id: 0,
    unit_id: 0,
    user_name: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadLeases();
  }

  loadLeases() {
    this.api.getLeases().subscribe((res: any) => {
      this.leases = res;
    });
  }

  createLease() {
    this.api.createLease(this.form).subscribe(() => {
      alert('Lease created');
      this.form = { Booking_id: 0, unit_id: 0, user_name: '' };
      this.loadLeases();
    });
  }

  deleteLease(id: number) {
    if (confirm('End this lease?')) {
      this.api.deleteLease(id).subscribe(() => {
        alert('Lease deleted');
        this.loadLeases();
      });
    }
  }
}
