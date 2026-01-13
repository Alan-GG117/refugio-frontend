import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Mascotas } from '../../services/mascotas';
import { Solicitud } from '../../services/solicitud';
import { Acreedor } from '../../services/acreedor';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  usuario: any = {};
  totalAcreedores: number = 0;
  totalMascotas: number = 0;

  constructor(
    private router: Router,
    private mascotaService: Mascotas,
    private solicitudService: Solicitud,
    private acreedorService: Acreedor,
    private authService: Auth
  ) {}

  ngOnInit() {
    this.cargarEstadisticas();

    const datos = localStorage.getItem('usuario_sesion');
    if (datos) {
      this.usuario = JSON.parse(datos);
    }
  }

  cerrarSesion() {

    this.authService.logout();

    this.router.navigate(['/login']);
  }

  cargarEstadisticas() {
    this.mascotaService.obtenerTodas().subscribe({
      next: (data) => this.totalMascotas = data.length
    });
    this.acreedorService.obtenerTodos().subscribe({
      next: (data) => this.totalAcreedores = data.length
    });
  }
}
