import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'https://refugio-backend-production.up.railway.app/api/auth';

  private usuarioSubject = new BehaviorSubject<any>(this.obtenerUsuarioStorage());

  public usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient){ }

  private obtenerUsuarioStorage(): any {
    const sesion = localStorage.getItem('usuario_sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }

  guardarSesion(datosUsuarios: any) {
    localStorage.setItem('usuario_sesion', JSON.stringify(datosUsuarios));
    this.usuarioSubject.next(datosUsuarios);
  }

  logout() {
    localStorage.removeItem('usuario_sesion');
    this.usuarioSubject.next(null);
  }

  get usuarioActual() {
    return this.usuarioSubject.value;
  }
}
