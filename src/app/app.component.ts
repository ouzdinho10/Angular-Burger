import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Déconnexion réussie');
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Erreur lors de la déconnexion', error);
      }
    );
  }
}
