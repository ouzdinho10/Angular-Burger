import { Component, OnInit } from '@angular/core';
import { Burger } from '../model/burger';
import { BurgerService } from '../service/burger.service';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {
  tabBurger: Burger[] = [];
  searchQuery = '';
  currentPage = 1;
  totalPages = 1;
  totalCount = 0;
  title = 'Liste des Burgers';
  

  constructor(private burgerService: BurgerService) { }

  ngOnInit() {
    this.getAllBurgers();
  }

  getAllBurgers() {
    this.burgerService.getBurgers(this.searchQuery, this.currentPage).subscribe(
      (response) => {
        this.tabBurger = response.data;
        this.totalCount = response.totalCount;
        this.totalPages = response.totalPages; // Assuming 10 burgers per page
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search() {
    this.currentPage = 1;
    this.getAllBurgers();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getAllBurgers();
  }

  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Method to get full image URL
  getImageUrl(imagePath: string): string {
    return `http://localhost:8000/${imagePath}`;
  }
}
