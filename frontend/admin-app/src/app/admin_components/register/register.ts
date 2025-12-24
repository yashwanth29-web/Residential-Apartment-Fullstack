import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 name = '';
  email = '';
  password = '';
  role='';

  constructor(private api: ApiService, private router: Router) {}
  
  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };
    console.log("register data:", data);

    this.api.register(data).subscribe(() => {
      alert(this.role+ ' registered successfully');
      this.router.navigate(['/']);
    });
  }
}