import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-bookings',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.api.myBookings().subscribe({
      next: (res: any) => {
        this.bookings = res;
      },
      error: () => {
        this.toastr.error('Failed to load bookings', 'Error');
      }
    });
  }
}
