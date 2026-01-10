import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cita {

  private apiUrl = 'http://localhost:8080/api/citas';

  constructor (private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agendar(cita: any): Observable<any> {
    return this.http.post(this.apiUrl, cita, { headers: this.getHeaders() });
  }

  cambiarEstado(id: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/estado?nuevoEstado=${estado}`, {}, { headers: this.getHeaders() });
  }
}
