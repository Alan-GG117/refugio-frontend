import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Mascotas {
  private apiUrl = 'https://refugio-backend-production.up.railway.app/api/mascotas';

  constructor(private http: HttpClient) {}

  //Obtener token del navegador
  private getHeaders(): HttpHeaders {
    const sesion = localStorage.getItem('usuario_sesion');
    return new HttpHeaders({
      'Content-Type':'application/json'
    });
  }

  //listar todas
  obtenerTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Guardar nueva
  crearMascota(mascota: any): Observable<any> {
    return this.http.post(this.apiUrl, mascota, {headers: this.getHeaders()});
  }

  //Eliminar Mascota
  eliminarMascota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  //Actualizar mascota
  actualizarMascota(id: number, mascota: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mascota, { headers: this.getHeaders() });
  }
}
