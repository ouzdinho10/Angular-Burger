import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { Burger } from '../model/burger';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) {}

  getOrders(filter: { burgerId?: number, date?: string, status?: string, clientId?: number } = {}): Observable<{ orders: Order[], burgers: Burger[], clients: User[] }> {
    let params = new HttpParams();
  
    if (filter.burgerId) {
      params = params.set('burger_id', filter.burgerId.toString());
    }
    if (filter.date) {
      params = params.set('date', filter.date);
    }
    if (filter.status) {
      params = params.set('status', filter.status);
    }
    if (filter.clientId) {
      params = params.set('client_id', filter.clientId.toString());
    }
  
    return this.httpClient.get<{ orders: Order[], burgers: Burger[], clients: User[] }>(`${this.apiUrl}/admins/orders`, { params });
  }
  

  getOrder(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  createOrder(order: Order): Observable<{ order: Order }> {
    return this.httpClient.post<{ order: Order }>(`${this.apiUrl}/orders`, order);
  }

  cancelOrder(orderId: number): Observable<{ order: Order }> {
    return this.httpClient.post<{ order: Order }>(`${this.apiUrl}/orders/cancel/${orderId}`, {});
  }

  payOrder(orderId: number, amount: number): Observable<{ order: Order }> {
    return this.httpClient.post<{ order: Order }>(`${this.apiUrl}/orders/${orderId}/pay`, { montant: amount });
  }

  completeOrder(orderId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/orders/${orderId}/complete`, {});
  }

  getOrderStatus(burgerId: number, userId: number): Observable<{ order: Order | null }> {
    return this.httpClient.get<{ order: Order | null }>(`${this.apiUrl}/orders/status/${burgerId}?userId=${userId}`);
  }
  
  
  

  filterOrders(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (const key of Object.keys(params)) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.httpClient.get<any>(`${this.apiUrl}/orders/filtre`, { params: httpParams });
  }

  cancelOrderAsAdmin(orderId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/orders/${orderId}/annuler`, {});
  }
  
  markAsPaid(orderId: number, amount: number, paymentDate: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/orders/${orderId}/pay`, { montant: amount, payment_date: paymentDate });
  }
  placeOrder(order: Order): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/orders`, order);
  }
}
