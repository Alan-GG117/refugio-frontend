import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  //Datos del Usuario
  usuario = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    telefono: '',
    ocupacion: ''
  };

  direccion = {
    cp: '',
    estado: '',
    municipioAlcaldia: '',
    colonia: '',
    tipoCalle: '',
    calle: '',
    numExterior: '',
    numInterior: '',
    referencias: ''
  };

  colonias: string[] = [];
  cargandoCP = false;

  constructor(
    private authService: Auth,
    private http: HttpClient,
    private router: Router
  ) {}

  buscarCP() {
    if(this.direccion.cp.length !== 5) return;

    this.cargandoCP = true;
    const token = '43a733dc-973e-43b9-884d-2f20034647ee';
    const url = `https://api.copomex.com/query/info_cp/${this.direccion.cp}?token=${token}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        if(!data.error) {

          if (Array.isArray(data)) {
            this.direccion.estado = data[0].response.estado;
            this.direccion.municipioAlcaldia = data[0].response.municipio;

            this.colonias = data.map((item: any) => item.response.asentamiento);
          }
          else {
            const info = data.response;
            this.direccion.estado = info.estado;
            this.direccion.municipioAlcaldia = info.municipio;

            this.colonias = Array.isArray(info.asentamiento)
                            ? info.asentamiento
                            : [info.asentamiento];
          }

          if(this.colonias.length > 0) {
            this.direccion.colonia = this.colonias[0];
          }
        }
        this.cargandoCP = false;
      },
      error: (err) => {
        console.error(err);
        this.cargandoCP = false;
        this.colonias = [];
      }
    });
  }

  registrar() {
    const payload = {
      usuario: this.usuario,
      direccion: this.direccion
    };

    this.authService.registrarUsuario(payload).subscribe({
      next: (res) => {
        alert("Usuario registrado exitosamente!");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert("Error al registrar: " + (err.error || "Intente más tarde"))
      }
    });
  }
}
