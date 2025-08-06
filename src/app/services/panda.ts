// panda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PandaService {
  private readonly API_URL = 'https://api.pandascore.co';

  constructor(private http: HttpClient) {}

  private getParams() {
    return new HttpParams().set('token', environment.pandascoreToken);
  }
// panda.service.ts
getOrganizedLeagues() {
  return this.getTournaments().pipe(
    map((tournaments: any[]) => {
      const now = new Date();
      const leaguesMap = new Map<string, any>();
      
      tournaments.forEach(tournament => {
        const leagueName = tournament.league?.name || 'Autres';
        if (!leaguesMap.has(leagueName)) {
          leaguesMap.set(leagueName, {
            name: leagueName,
            currentTournaments: [],
            otherTournaments: []
          });
        }
        
        const start = new Date(tournament.begin_at);
        const end = new Date(tournament.end_at);
        const isCurrent = start <= now && now <= end;
        
        if (isCurrent) {
          leaguesMap.get(leagueName).currentTournaments.push(tournament);
        } else {
          leaguesMap.get(leagueName).otherTournaments.push(tournament);
        }
      });

      return Array.from(leaguesMap.values());
    })
  );
}
getTournaments(): import('rxjs').Observable<any[]> {
  const url = `${this.API_URL}/lol/tournaments?token=${environment.pandascoreToken}`;
  console.log('🛠️ URL appelée :', url); // Vérifie l'URL exacte
  
  return this.http.get<any[]>(url).pipe(
    tap({
      next: (data) => console.log('✅ Données reçues :', data),
      error: (err) => console.error('❌ Erreur complète :', err)
    })
  );
}

getCurrentTournaments() {
  return this.getTournaments().pipe(
    map((tournaments: any[]) => {
      const now = new Date();
      console.log('Maintenant:', now); // Debug
      
      return tournaments.filter(t => {
        const start = new Date(t.begin_at);
        const end = new Date(t.end_at);
        const isCurrent = start <= now && now <= end;
        
        console.log(t.name, { 
          start, 
          end, 
          isCurrent,
          now 
        }); // Debug complet
        
        return isCurrent;
      });
    })
  );
}
}