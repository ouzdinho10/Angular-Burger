import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.user.email, password: this.user.password })
      .subscribe(response => {
        const token = (response as any).access_token;
        const role = (response as any).user.role;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'client') {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      }, error => {
        console.error('Login error:', error);
        this.errorMessage = error.error.error || 'Email or password is incorrect';
      });
  }
}
