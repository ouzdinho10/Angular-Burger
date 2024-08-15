import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';
  private user: User | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.user = response.user;
      })
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.router.navigate(['/login']))
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  fetchUser(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/user`, { headers }).pipe(
      tap((user: User) => {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      }),
      catchError((error) => {
        console.error('Error fetching user:', error);
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return of(null);
      })
    );
  }
}
