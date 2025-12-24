import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../navbar/navbar';
@Component({
  standalone: true,
  selector: 'app-amenities',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './amenities.html',
  styleUrl: './amenities.css',
})
export class Amenities implements OnInit {

  // All amenities from API
  amenities: any[] = [];

  // Grouped by tower_id
  groupedAmenities: { [towerId: number]: any[] } = {};

  // Sorted tower IDs (1,2,3...)
  towerKeys: number[] = [];

  // Search input
  searchText: string = '';

  constructor(public api: ApiService) {}

  ngOnInit(): void {
    this.api.getResidentAmenities().subscribe((res: any[]) => {
      this.amenities = res;
      this.applyGrouping(res);
    });
  }

  // Triggered on search input
  search(): void {
    const filtered = this.amenities.filter(a =>
      a.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.applyGrouping(filtered);
  }

  // Group amenities tower-wise
  private applyGrouping(list: any[]): void {
    this.groupedAmenities = {};

    list.forEach(a => {
      if (!this.groupedAmenities[a.tower_id]) {
        this.groupedAmenities[a.tower_id] = [];
      }
      this.groupedAmenities[a.tower_id].push(a);
    });

    // Sort tower IDs
    this.towerKeys = Object.keys(this.groupedAmenities)
      .map(Number)
      .sort((a, b) => a - b);
  }
}
