import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';
@Component({
  standalone: true,
  selector: 'app-bookings',
  imports: [CommonModule , NavbarComponent],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.myBookings().subscribe((res: any) => {
      this.bookings = res;
    });
  }
}
