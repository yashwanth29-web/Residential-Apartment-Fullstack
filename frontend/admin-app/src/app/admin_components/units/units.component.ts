import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
@Component({
  standalone: true,
  selector: 'app-units',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units: any[] = [];
  flat_number = '';
  rent = 0;
  tower_id = 0;
  image = '';

  constructor(public api: ApiService) {}
logout() {
  localStorage.removeItem('token');
  location.href = '/';
}

  ngOnInit() {
    this.loadUnits();
  }

  loadUnits() {
    this.api.getAdminUnits().subscribe((res: any) => {
      this.units = res;
    });
  }
  deleteUnit(id: number): void {
  if (confirm('Are you sure you want to delete this unit?')) {
    this.api.deleteUnit(id).subscribe(() => {
      alert('Unit deleted successfully');
      this.loadUnits(); // refresh list
    });
  }
}


  createUnit() {
  const data = {
    flat_number: this.flat_number,
    rent: this.rent,
    tower_id: this.tower_id,
    image: this.image   // ✅ NEW
  };
  
 

  this.api.createUnit(data).subscribe(() => {
    alert('Unit added');
    this.loadUnits();
  });
  this.flat_number = '';
  this.rent = 0;
  this.tower_id = 0;
  this.image = '';
}

}
