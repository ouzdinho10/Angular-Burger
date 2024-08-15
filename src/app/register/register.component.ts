import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User(); // Initialisation du modèle User

  constructor(private authService: AuthService, private router: Router) {} // Injectez Router

  register() {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful', response);
        // Redirection vers la page de connexion après une inscription réussie
        this.router.navigate(['/login']); // Assurez-vous que '/login' correspond à la route de votre page de connexion
      },
      error => {
        console.error('Registration error:', error);
        alert('Registration failed');
      }
    );
  }
}
