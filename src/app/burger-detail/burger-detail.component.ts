import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BurgerService } from '../service/burger.service';
import { AuthService } from '../service/auth.service';
import { OrderService } from '../service/order.service.service';
import { Burger } from '../model/burger';
import { Order } from '../model/order';

@Component({
  selector: 'app-burger-detail',
  templateUrl: './burger-detail.component.html',
  styleUrls: ['./burger-detail.component.css']
})
export class BurgerDetailComponent implements OnInit {
  burger: Burger | null = null;
  order: Order | null = null;
  isLoggedIn: boolean = false;
  userId: number | null = null;
  buttonLabel: string = '';
  currentDate: string = ''; 


  constructor(
    private route: ActivatedRoute,
    private burgerService: BurgerService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      this.userId = user ? user.id : null;
    }
  
    this.currentDate = new Date().toISOString(); // Ajoutez cette ligne

    this.route.paramMap.subscribe(params => {
      const burgerId = +params.get('id')!;
      this.burgerService.getBurger(burgerId).subscribe(
        (burger: Burger) => {
          this.burger = burger;
          if (this.isLoggedIn && this.userId) {
            this.checkOrderStatus();
          }
        },
        error => console.error('Error fetching burger:', error)
      );
    });
  }

  checkOrderStatus(): void {
    if (this.burger && this.userId) {
      this.orderService.getOrderStatus(this.burger.id, this.userId).subscribe(
        response => {
          this.order = response.order || null;
          this.updateButtonState();
        },
        error => console.error('Error fetching order status:', error)
      );
    }
  }

  createOrder(): void {
    if (this.userId && this.burger) {
      const order: Order = {
        id: 0,
        clientId: this.userId,
        burgerId: this.burger.id,
        amount: this.burger.prix,
        status: 'pending'
      };

      this.orderService.placeOrder(order).subscribe(response => {
        this.order = response.order;
        this.updateButtonState();
      });
    }
  }

  cancelOrder(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe(
      () => {
        this.order = null; // Réinitialiser l'état de la commande après annulation
        this.updateButtonState(); // Recharger l'état du bouton après l'annulation
      },
      error => console.error('Error cancelling order:', error)
    );
  }

  payOrder(orderId: number): void {
    if (this.burger) {
      const paymentDate = new Date().toISOString().split('T')[0];
      this.orderService.markAsPaid(orderId, this.burger.prix, paymentDate).subscribe(
        response => {
          console.log('Réponse du serveur:', response);
          
          if (this.order) {
            this.order.status = 'paid';
            console.log('Paiement réussi:', response);
  
            // Affichez le message de succès
            alert('Paiement effectué avec succès !!!!');
          }
  
          this.updateButtonState();
        },
        error => {
          console.error('Erreur lors du paiement:', error);
          // Affichez un message d'erreur à l'utilisateur
          alert('Une erreur s\'est produite lors du paiement. Veuillez réessayer.');
        }
      );
    }
  }
    

  getButtonLabel(): string {
    if (this.order) {
      if (this.order.status === 'pending') {
        return 'Annuler Commande';
      } else if (this.order.status === 'completed') {
        return 'Payer';
      }
    }
    return 'Commander';
  }

  onActionButtonClick(): void {
    if (this.buttonLabel === 'Commander') {
      this.createOrder();
    } else if (this.buttonLabel === 'Annuler Commande') {
      if (this.order) {
        this.cancelOrder(this.order.id);
      }
    } else if (this.buttonLabel === 'Payer') {
      if (this.order) {
        this.payOrder(this.order.id);
      }
    }
  }
  

  updateButtonState(): void {
    if (this.order) {
      if (this.order.status === 'pending') {
        this.buttonLabel = 'Annuler Commande';
      } else if (this.order.status === 'completed') {
        this.buttonLabel = 'Payer';
      } else if (this.order.status === 'paid'){
        this.buttonLabel = ''; // Le bouton disparaît une fois payé ou s'il n'y a pas de commande en cours
      }
    } else {
      this.buttonLabel = 'Commander'; // Par défaut, afficher "Commander" si aucune commande n'existe
    }
  }
  

  getImageUrl(imagePath: string): string {
    return `http://localhost:8000/${imagePath}`;
  }
}
