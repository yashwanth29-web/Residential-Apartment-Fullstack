import { Navbar } from '../navbar/navbar';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-bookings',
  imports: [CommonModule, Navbar],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  results: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.api.getAdminBookings().subscribe((res: any) => {
      this.results = res;
    });
  }

  update(id: number, status: string): void {
    this.api.updateBooking(id, status).subscribe(() => {
      alert('Booking updated');
      this.loadBookings();
    });
  }
}
