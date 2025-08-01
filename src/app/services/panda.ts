// panda.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class PandaService {
  private readonly API_URL = 'https://api.pandascore.co';

  constructor(private http: HttpClient) {}

  private getParams() {
    return new HttpParams().set('token', environment.pandascoreToken);
  }

  getTournaments() {
    return this.http.get(`${this.API_URL}/lol/tournaments`, {
      params: this.getParams()
    });
  }
}