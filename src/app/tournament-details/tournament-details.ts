import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { PandaService } from '../services/panda';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './tournament-details.html',
  styleUrls: ['./tournament-details.scss']
})
export class TournamentDetailsComponent {
  tournament: any;
  standings: any[] = [];
  teams: any[] = [];
  displayedColumns = ['position', 'team', 'wins', 'losses'];

  constructor(
    private route: ActivatedRoute,
    private pandaService: PandaService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTournamentDetails(id);
    }
  }

  loadTournamentDetails(id: string) {
    this.pandaService.getTournamentById(id).subscribe({
      next: (data) => {
        this.tournament = data.tournament;
        this.standings = Array.isArray(data.standings) ? data.standings : [];
        this.teams = Array.isArray(data.teams) ? data.teams : [];
      },
      error: (err) => console.error('Erreur:', err)
    });
  }
}