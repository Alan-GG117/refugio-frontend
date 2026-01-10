import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solicitud {
  private apiUrl = 'https://refugio-backend-production.up.railway.app/api/solicitudes';

  constructor(private http: HttpClient) {}

  registrarSolicitud(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

  // Obtener todas las solicitudes
  obtenerTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Cambiar estado (Aprobar/Rechazar)
  cambiarEstado(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/estado?estado=${nuevoEstado}`, {});
  }
}
