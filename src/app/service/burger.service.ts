import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Burger } from '../model/burger';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
  imageUrl: 'http://localhost:8000/images'
};

export interface BurgerResponse {
  data: Burger[];
  totalCount: number;
  totalPages: number; // Ajoutez cette ligne pour inclure totalPages
}

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  private apiUrl = environment.apiUrl;
  private imageUrl = environment.imageUrl;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getBurgers(searchQuery: string = '', page: number = 1): Observable<BurgerResponse> {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('search', searchQuery);
    }
    params = params.append('page', page.toString());
    
    return this.httpClient.get<BurgerResponse>(`${this.apiUrl}/burgers`, { params }).pipe(
      
      catchError(error => {
        console.error('Error fetching burgers:', error);
        return throwError(error);
      })
    );
  }
  

  getBurger(id: number): Observable<Burger> {
    return this.httpClient.get<Burger>(`${this.apiUrl}/burgers/${id}`);
  }

  addBurger(burger: FormData): Observable<Burger> {
    return this.httpClient.post<Burger>(`${this.apiUrl}/burgers`, burger)
      .pipe(
        catchError(error => {
          console.error('Error adding burger:', error);
          return throwError(error);
        })
      );
  }

  updateBurger(id: number, burger: FormData): Observable<Burger> {
    return this.httpClient.put<Burger>(`${this.apiUrl}/burgers/${id}`, burger).pipe(
      catchError(error => {
        console.error('Error updating burger:', error);
        return throwError(error);
      })
    );
  }
  
  deleteBurger(id: number): Observable<Burger> {
    return this.httpClient.delete<Burger>(`${this.apiUrl}/burgers/${id}`);
  }



  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.apiUrl}/orders`, order);
  }

  cancelOrder(orderId: number): Observable<Order> {
    return this.httpClient.post<Order>(`${this.apiUrl}/orders/cancel/${orderId}`, {});
  }

  payOrder(orderId: number, amount: number): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/orders/${orderId}/pay`, { montant: amount, payment_date: new Date().toISOString() });
  }

  getOrderStatus(burgerId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}/orders/status/${burgerId}`);
  }
  
}
