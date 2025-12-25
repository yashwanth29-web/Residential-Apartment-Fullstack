import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-units',
  imports: [CommonModule, NavbarComponent,FormsModule],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
 units: any[] = [];
  flat_number = '';
  rent = 0;
  tower_id = 0;
  image = '';
  showPopup = false;
selectedUnitId!: number;

name = '';
email = '';
amount = 0;

  constructor(public api: ApiService) {}


  ngOnInit() {
    this.loadUnits();
  }

  loadUnits() {
  this.api.getResidentUnits().subscribe((res: any) => {
    console.log('UNITS FROM API:', res);   // 🔴 IMPORTANT
    this.units = res;
  });
}


openPopup(unitamount: number) {
  this.amount = unitamount;
  this.showPopup = true;
  
}

closePopup() {
  this.name = '';
  this.email = '';
  this.amount = 0;
  this.showPopup = false;
  
}

pay() {
  // call booking API after payment
  
    this.name = '';
  this.email = '';
  this.amount = 0;
    this.showPopup = false;
    alert('Payment Successful! Booking Confirmed.');
    this.loadUnits();
  
}


  book(unitId: number , unitamount: number) {
    this.amount = unitamount;
  this.showPopup = true;
  
    this.api.bookUnit(unitId).subscribe(() => {
      // refresh list after booking
      this.loadUnits();
    }, (err: any) => {
      console.error('Booking failed', err);
      // optionally show user feedback
    });
  }

  

  
  
}
 