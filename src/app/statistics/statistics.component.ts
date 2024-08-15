import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../service/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  ongoingOrdersCount: number = 0;
  completedOrdersCount: number = 0;
  canceledOrdersCount: number = 0;
  dailyRevenue: number = 0;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (data) => {
        this.ongoingOrdersCount = data.ongoingOrders.length;
        this.completedOrdersCount = data.completedOrders.length;
        this.canceledOrdersCount = data.canceledOrders.length;
        this.dailyRevenue = data.dailyRevenue;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques :', err);
        // Gérez l'erreur, par exemple en affichant un message d'erreur à l'utilisateur
      }
    });
  }
}
