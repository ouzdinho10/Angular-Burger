import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BurgerService, BurgerResponse } from '../service/burger.service';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service.service';
import { Burger } from '../model/burger';

declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  burgers: Burger[] = [];
  isAdmin: boolean = false;
  newBurger: Partial<Burger> = {
    nom: '',
    description: '',
    prix: 0,
    status: '',
    image: ''
  };
  selectedFile: File | null = null;

  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private burgerService: BurgerService,
    private authService: AuthService,
    public notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.loadBurgers();
      this.isAdmin = this.authService.isAdmin();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadBurgers(): void {
    this.burgerService.getBurgers('', this.currentPage).subscribe(
      (response: BurgerResponse) => {  // On utilise BurgerResponse ici
        this.burgers = response.data; // Assigne les burgers depuis response.data
        this.totalPages = response.totalPages; // Met à jour le total des pages
      },
      error => {
        if (error.status === 401) {
          this.notificationService.showMessage('Session expirée, veuillez vous reconnecter');
          this.router.navigate(['/login']);
        } else {
          console.error(error);
        }
      }
    );
  }

  addBurger(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nom', this.newBurger.nom!);
      formData.append('description', this.newBurger.description!);
      formData.append('prix', this.newBurger.prix!.toString());
      formData.append('status', this.newBurger.status!);
      formData.append('image', this.selectedFile, this.selectedFile.name);
  
      this.burgerService.addBurger(formData).subscribe(
        () => {
          this.loadBurgers();
          this.resetForm();
          this.notificationService.showMessage('Burger ajouté avec succès');
          this.closeAddBurgerModal();
        },
        error => {
          console.error('Error adding burger:', error);
          this.notificationService.showMessage('Erreur lors de l\'ajout du burger');
        }
      );
    } else {
      console.error('No file selected');
      this.notificationService.showMessage('Veuillez sélectionner une image');
    }
  }

  editBurger(burger: Burger): void {
    const formData = new FormData();
    formData.append('nom', burger.nom);
    formData.append('description', burger.description);
    formData.append('prix', burger.prix.toString());
    formData.append('status', burger.status);
  
    // Si un nouveau fichier a été sélectionné, ajoute-le
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.burgerService.updateBurger(burger.id, formData).subscribe(
      () => {
        this.loadBurgers();
        this.notificationService.showMessage('Burger mis à jour avec succès');
        this.router.navigate(['/burgers/edit', burger.id]);
      },
      error => {
        console.error('Error updating burger:', error);
        this.notificationService.showMessage('Erreur lors de la mise à jour du burger');
      }
    );
  }

  deleteBurger(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce burger ?')) {
      this.burgerService.deleteBurger(id).subscribe(
        () => {
          this.loadBurgers();
          this.notificationService.showMessage('Burger supprimé avec succès');
        },
        error => console.error('Error deleting burger:', error)
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  resetForm(): void {
    this.newBurger = {
      nom: '',
      description: '',
      prix: 0,
      status: '',
      image: ''
    };
    this.selectedFile = null;
  }

  openAddBurgerModal(): void {
    const modalElement = document.getElementById('addBurgerModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeAddBurgerModal(): void {
    const modalElement = document.getElementById('addBurgerModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBurgers();
    }
  }

  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getImageUrl(imagePath: string): string {
    return `http://localhost:8000/${imagePath}`;
  }
}
