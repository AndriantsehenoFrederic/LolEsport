// panda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PandaService {
  private readonly API_URL = 'https://api.pandascore.co';

  constructor(private http: HttpClient) {}

  private getParams() {
    return new HttpParams().set('token', environment.pandascoreToken);
  }

  getTournaments() {
  const url = `${this.API_URL}/lol/tournaments?token=${environment.pandascoreToken}`;
  console.log('🛠️ URL appelée :', url); // Vérifie l'URL exacte
  
  return this.http.get(url).pipe(
    tap({
      next: (data) => console.log('✅ Données reçues :', data),
      error: (err) => console.error('❌ Erreur complète :', err)
    })
  );
}
}