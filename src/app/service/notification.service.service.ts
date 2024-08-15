// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  showMessage(message: string): void {
    this.messageSubject.next(message);
    setTimeout(() => this.clearMessage(), 3000); // Clear the message after 3 seconds
  }

  clearMessage(): void {
    this.messageSubject.next(null);
  }
}
