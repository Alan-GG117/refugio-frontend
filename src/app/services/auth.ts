import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  //Url del backend Java
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient){ }

  registrarUsuario(datos: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }

  guardarSesion(datosUsuarios: any) {
    localStorage.setItem('usuario_sesion', JSON.stringify(datosUsuarios))
  }
}
