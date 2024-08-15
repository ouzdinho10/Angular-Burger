import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BurgerService } from '../service/burger.service';
import { Burger } from '../model/burger';
import { NotificationService } from '../service/notification.service.service';

@Component({
  selector: 'app-edit-burger',
  templateUrl: './edit-burger.component.html',
  styleUrls: ['./edit-burger.component.css']
})
export class EditBurgerComponent implements OnInit {
  burger: Burger = new Burger();
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute, 
    private burgerService: BurgerService, 
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.burgerService.getBurger(+id).subscribe(
        (response: Burger) => this.burger = response,
        error => console.error(error)
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updateBurger(): void {
    const id = this.burger.id; // Assurez-vous que l'ID du burger est correctement défini
    const formData = new FormData();
    formData.append('nom', this.burger.nom);
    formData.append('description', this.burger.description);
    formData.append('status', this.burger.status);
    formData.append('prix', this.burger.prix.toString());
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.burgerService.updateBurger(id, formData).subscribe(
      () => {
        this.notificationService.showMessage('Burger modifié avec succès');
        this.router.navigate(['/admin']);
      },
      error => {
        if (error.status === 403) {
          this.notificationService.showMessage('Le burger ne peut pas être modifié car il est en cours de commande.');
        } else {
          console.error('Error updating burger:', error);
          this.notificationService.showMessage('Erreur lors de la modification du burger');
        }
      }
    );
  }
  
}
