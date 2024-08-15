import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://127.0.0.1:8000/api/admins/statistics'; // Remplacez par votre URL d'API

  constructor(private httpClient: HttpClient) {}

  getStatistics(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }
}
