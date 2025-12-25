import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats: any = {};

  statsArray: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAdminDashboard().subscribe((res: any) => {
      this.stats = res || {};

      this.statsArray = [
        {
          title: 'Total Towers',
          value: 0,
          finalValue: this.stats.totalTowers || 12,
          suffix: '',
          change: '+2 this month',
          positive: true,
          negative: false,
          trending: 'Hot',
          image: 'https://img.icons8.com/fluency/96/000000/skyscrapers.png',
          highlight: true
        },
        {
          title: 'Active Units',
          value: 0,
          finalValue: this.stats.totalUnits || 156,
          suffix: '',
          change: '92% occupancy',
          positive: true,
          negative: false,
          trending: 'Stable',
          image: 'https://img.icons8.com/fluency/96/000000/apartment.png'
        },
        {
          title: 'Pending Bookings',
          value: 0,
          finalValue: this.stats.pendingBookings || 9,
          suffix: '',
          change: 'Requires attention',
          attention: true,
          positive: false,
          negative: false,
          trending: 'Critical',
          image: 'https://img.icons8.com/fluency/96/000000/calendar.png'
        },
        {
          title: 'Occupied Units',
          value: 0,
          finalValue: this.stats.occupiedUnits || 0,
          suffix: '',
          change: 'Currently rented',
          positive: true,
          negative: false,
          trending: 'Growing',
          image: 'https://img.icons8.com/fluency/96/000000/money.png'
        }
      ];

      this.statsArray.forEach(stat => {
        this.animateCount(stat);
      });
    });
  }

  animateCount(stat: any, duration: number = 1200) {
    let start = 0;
    const end = stat.finalValue;
    const step = Math.max(1, Math.floor(end / (duration / 16)));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        stat.value = end;
        clearInterval(timer);
      } else {
        stat.value = start;
      }
    }, 16);
  }
}
