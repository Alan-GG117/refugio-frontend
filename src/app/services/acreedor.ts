import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Acreedor {

  private apiUrl = 'http://localhost:8080/api/acreedores';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

  obtenerTodos():Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {headers: this.getHeaders()});
  }

  guardar(acreedor: any): Observable<any> {
    return this.http.post(this.apiUrl, acreedor, { headers: this.getHeaders() });
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
