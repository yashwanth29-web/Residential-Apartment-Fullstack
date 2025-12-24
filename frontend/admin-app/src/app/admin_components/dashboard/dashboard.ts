import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Navbar } from '../navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, Navbar, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  stats: any = {};

  

  constructor(private api: ApiService) {}
    // In dashboard.ts
// dashboard.ts
statsArray = [
  {
    title: 'Total Towers',
    value: this.stats.totalTowers || '12',
    suffix: '', // no suffix needed
    change: '+2 this month',
    positive: true,
    negative: false,
    trending: 'Hot',
    image: 'https://img.icons8.com/fluency/96/000000/skyscrapers.png',
    bg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=90',
    highlight: true
  },
  {
    title: 'Active Units',
    value: this.stats.activeUnits || '156',
    suffix: '', // no suffix
    change: '92% occupancy',
    positive: true,
    negative: false,
    trending: 'Stable',
    image: 'https://img.icons8.com/fluency/96/000000/apartment.png',
    bg: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=90'
  },
  {
    title: 'Pending Bookings',
    value: this.stats.pendingBookings || '9',
    suffix: '', // no suffix
    change: 'Requires attention',
    attention: true,
    positive: false,
    negative: false,
    trending: 'Critical',
    image: 'https://img.icons8.com/fluency/96/000000/calendar.png',
    bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgplexINbP1e4fF1Jr3g_3wLQYdsXzGxWMLA&s'
  },
  {
    title: 'Monthly Revenue',
    value: this.stats.monthlyRevenue || '$248K',
    suffix: '', // already included in value, or use '$' if needed
    change: '+18% vs last',
    positive: true,
    negative: false,
    trending: 'Growing',
    image: 'https://img.icons8.com/fluency/96/000000/money.png',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90'
  },
  {
    title: 'Total Tenants',
    value: this.stats.totalTenants || '384',
    suffix: '', // no suffix
    change: '+14 this month',
    positive: true,
    negative: false,
    trending: 'Rising',
    image: 'https://img.icons8.com/fluency/96/000000/group.png',
    bg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=90'
  },
  {
    title: 'Occupancy Rate',
    value: this.stats.occupancyRate || '94',
    suffix: '%', // ← ADDED HERE (best example)
    change: 'All-time high',
    positive: true,
    negative: false,
    trending: 'Peak',
    image: 'https://img.icons8.com/fluency/96/000000/percentage.png',
    bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAUbn7IlexfIjqkPf4-z-cEcj6U8WMojnVg&s?w=1200&q=90'
  }
];

  ngOnInit(): void {
    this.api.getAdminDashboard().subscribe((res: any) => {
      this.stats = res || {};

      // Initialize cards with REAL images + background
    
      // Start count-up animation
      this.statsArray.forEach(stat => {
        this.animateCount(stat);
      });
    });
  }

  /* =========================
     COUNT-UP ANIMATION
     ========================= */
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

  /* =========================
     HELPERS
     ========================= */
  parsePercent(val: string): number {
    return parseInt(val.toString().replace('%', ''), 10);
  }

  parseK(val: string): number {
    return parseInt(val.toString().replace(/[^\d]/g, ''), 10);
  }
}
