import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
@Component({
  standalone: true,
  selector: 'app-towers',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css']
})
export class TowersComponent implements OnInit {
  name = '';
  towers: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTowers();
  }

  loadTowers() {
    this.api.getTowers().subscribe((res: any) => {
      this.towers = res || [];
    }, (err) => {
      console.error('Failed to load towers', err);
      this.towers = [];
    });
  }

  startEdit(t: any) {
    t.editing = true;
    t.editName = t.name;
  }

  cancelEdit(t: any) {
    t.editing = false;
    delete t.editName;
  }

  saveEdit(t: any) {
    const name = (t.editName || '').trim();
    if (!name) {
      alert('Please enter a name');
      return;
    }
    this.api.updateTower(t.id, name).subscribe(() => {
      t.editing = false;
      this.loadTowers();
    }, (err) => {
      console.error('Update failed', err);
      alert((err?.error?.message) || 'Update failed');
    });
  }

  deleteTower(t: any) {
    if (!confirm(`Delete tower "${t.name}"?`)) return;
    this.api.deleteTower(t.id).subscribe(() => {
      this.loadTowers();
    }, (err) => {
      console.error('Delete failed', err);
      alert((err?.error?.message) || 'Delete failed');
    });
  }

  createTower() {
    if (!this.name || !this.name.trim()) {
      alert('Please enter a tower name');
      return;
    }

    this.api.createTower(this.name.trim()).subscribe(() => {
      alert('Tower created');
      this.name = '';
      this.loadTowers();
    }, (err) => {
      console.error('Create failed', err);
      alert('Failed to create tower');
    });
  }

logout() {
  localStorage.removeItem('token');
  location.href = '/';
}

}  
