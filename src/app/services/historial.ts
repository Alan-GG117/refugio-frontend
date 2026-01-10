import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Historial {
  private apiUrl = 'http://localhost:8080/api/historial';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Obtener la ficha de UN perro
  obtenerPorMascota(mascotaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mascota/${mascotaId}`, { headers: this.getHeaders() });
  }

  // Registrar vacuna o consulta
  guardar(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos, { headers: this.getHeaders() });
  }
}
