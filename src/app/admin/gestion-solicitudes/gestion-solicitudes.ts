import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Solicitud } from '../../services/solicitud';

@Component({
  selector: 'app-gestion-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-solicitudes.html',
  styleUrl: './gestion-solicitudes.css',
})
export class GestionSolicitudes {

  solicitudes: any[] = [];
  constructor(private solicitudService: Solicitud) {}

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.solicitudService.obtenerTodas().subscribe({
      next: (data) => this.solicitudes = data,
      error: (e) => console.error(e)
    });
  }

  actualizar(solicitud: any, estado: string) {
    Swal.fire({
      title: `¿${estado === 'APROBADA' ? 'Aprobar' : 'Rechazar'} solicitud?`,
      text: `Vas a cambiar el estado de esta solicitud.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.cambiarEstado(solicitud.id, estado).subscribe({
          next: () => {
            Swal.fire('¡Listo!', `Solicitud ${estado}`, 'success');
            this.cargarSolicitudes();
          },
          error: () => Swal.fire('Error', 'No se pudo actualizar', 'error')
        });
      }
    });
  }
}
