import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OrderService } from '../service/order.service.service';
import { BurgerService } from '../service/burger.service';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { Order} from '../model/order';
import { Burger } from '../model/burger';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  burgers: Burger[] = [];
  clients: User[] = [];
  filterParams = {
    burger_id: '',
    date: '',
    status: '',
    client_id: ''
  };

  constructor(
    private orderService: OrderService,
    private burgerService: BurgerService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.loadOrders();
    this.loadUsers();
    this.loadBurgers();
  }
  
  loadOrders() {
    this.orderService.getOrders(this.filterParams).subscribe(data => {
      this.orders = data.orders;
      this.burgers = data.burgers;
      this.clients = data.clients;
    });
  }
  
  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.clients = users;
    });
  }
  
  loadBurgers() {
    this.burgerService.getBurgers().subscribe(response  => {
      this.burgers = response.data;
    });
  }

  onFilterChange(): void {
    this.loadOrders();
  }

  completeOrder(id: number): void {
    this.orderService.completeOrder(id).subscribe(() => this.loadOrders());
  }

  cancelOrderAsAdmin(orderId: number): void {
    this.orderService.cancelOrderAsAdmin(orderId).subscribe(
      () => this.loadOrders(),
      error => {
        console.error('Erreur lors de l\'annulation de la commande', error);
        // Ajoutez ici des notifications ou des messages d'erreur si nécessaire
      }
    );
  }
}