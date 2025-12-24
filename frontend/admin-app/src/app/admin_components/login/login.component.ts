import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  
  // ✅ Added these to fix template errors
  rememberMe = false;        // For the "Remember Me" checkbox
  showPassword = false;      // For the password show/hide toggle (used in your HTML)

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  // ✅ AUTO-SKIP LOGIN IF ADMIN ALREADY LOGGED IN
 ngOnInit(): void {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // ✅ Only auto-redirect if current URL is login page
  if (
    token &&
    role === 'admin' &&
    this.router.url === '/'   // IMPORTANT
  ) {
    this.router.navigate(['/admin/dashboard']);
  }
}

  // ✅ LOGIN METHOD (unchanged)
  login() {
  this.api.login({ email: this.email, password: this.password })
    .subscribe((res: any) => {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('role', res.user.role);

      if (res.user.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    });
}
}