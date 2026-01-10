import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaNegra {
  private apiUrl = 'https://refugio-backend-production.up.railway.app/api/lista-negra';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  bloquear(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos, { headers: this.getHeaders() });
  }

  desbloquear(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
