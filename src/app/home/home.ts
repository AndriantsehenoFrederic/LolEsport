import { Component, OnInit } from '@angular/core';
import { PandaService } from '../services/panda';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    DatePipe], // HttpClient n'est plus nécessaire ici
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  tournaments: any[] = [];

  constructor(private pandaService: PandaService) {}

  ngOnInit() {
    this.loadTournaments();
  }

  loadTournaments() {
    this.pandaService.getTournaments().subscribe({
      next: (data) => this.tournaments = data as any[],
      error: (err) => console.error(err)
    });
  }
}