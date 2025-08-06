import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { PandaService } from '../services/panda';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  leagues: any[] = [];
  currentLeagues: any[] = [];
  otherLeagues: any[] = [];
  isLoading = true;

  constructor(private pandaService: PandaService) {}

  ngOnInit() {
    this.loadLeagues();
  }

  loadLeagues() {
    this.pandaService.getOrganizedLeagues().subscribe({
      next: (leagues) => {
        this.leagues = leagues;
        this.currentLeagues = leagues.filter(l => l.currentTournaments.length > 0);
        this.otherLeagues = leagues.filter(l => l.currentTournaments.length === 0);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.isLoading = false;
      }
    });
  }

  // Fonction pour calculer les jours restants (optionnel)
  getRemainingDays(endDate: string): number {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
}