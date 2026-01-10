import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Mascotas } from '../../services/mascotas';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2';
import { Solicitud } from '../../services/solicitud';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit {

  mascotas: any[] = [];
  usuarioLogueado: boolean = false;
  datosUsuario: any = {};

  constructor(
    private mascotaService: Mascotas,
    private solicitudService: Solicitud,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMascotas();
    this.verificarSesion();
  }

  cargarMascotas() {
    this.mascotaService.obtenerTodas().subscribe({
      next: (data) => this.mascotas = data.filter(m => m.estadoAdopcion === 'DISPONIBLE'),
      error: (e) => console.error(e)
    });
  }

  verificarSesion() {
    const sesion = localStorage.getItem('usuario_sesion');
    if (sesion) {
      this.usuarioLogueado = true;
      this.datosUsuario = JSON.parse(sesion);
      console.log("✅ Sesión recuperada:", this.datosUsuario); // Esto debe mostrar datos, no {}
    } else {
      this.usuarioLogueado = false;
      this.datosUsuario = {};
    }
  }

  solicitarAdopcion(mascota: any) {
    if (!this.usuarioLogueado) {
      // CASO 1: NO ESTÁ LOGUEADO
      Swal.fire({
        title: 'Inicia Sesión',
        text: 'Necesitas una cuenta para adoptar a ' + mascota.nombre,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Ir al Login',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    } else {
      // CASO 2: LOGUEADO - CORRECCIÓN AQUÍ

      console.log("Intentando enviar solicitud con ID:", this.datosUsuario.usuarioId);

      const solicitudDTO = {
        // TU ERROR ESTABA AQUÍ: Angular buscaba .id, pero tu backend manda .usuarioId
        usuarioId: this.datosUsuario.usuarioId || this.datosUsuario.id,

        mascotaId: mascota.id,
        comentarios: `Hola, estoy muy interesado en adoptar a ${mascota.nombre}.`
      };

      this.solicitudService.registrarSolicitud(solicitudDTO).subscribe({
        next: (respuesta) => {
          Swal.fire({
            title: '¡Solicitud Recibida!',
            text: `Hemos registrado tu interés por ${mascota.nombre}.`,
            icon: 'success'
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo enviar la solicitud.', 'error');
        }
      });
    }
  }
}
