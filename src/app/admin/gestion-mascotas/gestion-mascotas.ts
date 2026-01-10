import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mascotas } from '../../services/mascotas';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestion-mascotas.html',
  styleUrl: './gestion-mascotas.css',
})
export class GestionMascotas implements OnInit{

  mascotas: any[] = [];
  mostrarFormulario = false;

  nuevaMascota = {
    id: null,
    nombre: '',
    especie: 'PERRO',
    raza: '',
    tamano: 'MEDIANO',
    sexo: 'MACHO',
    pesoActual: 0,
    fechaNacimientoAprox: '',
    fotoUrl: '',
    descripcionPerfil: '',
    estadoAdopcion: 'DISPONIBLE',
    aptoParaAdopcion: true
  };

  constructor(private mascotaService: Mascotas) {}

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.mascotaService.obtenerTodas().subscribe({
      next: (data) => this.mascotas = data,
      error: (e) => console.error("Error cargando mascotas:", e)
    });
  }

  guardar() {
    if(this.nuevaMascota.id) {
      //Modo edicion
      this.mascotaService.actualizarMascota(this.nuevaMascota.id, this.nuevaMascota).subscribe({
        next: () => {
          alert("Mascota actualizada");
          this.finalizarGuardado();
        },
        error: (e) => console.error(e),
      });
    } else {
      //Modo registro
      this.mascotaService.crearMascota(this.nuevaMascota).subscribe({
      next: () => {
        alert("¡Mascota registrada!");
        this.mostrarFormulario = false;
        this.cargarMascotas();
        this.limpiarFormulario();
      },
      error: (e) => {
        console.error(e);
        alert("Error al guardar. Revisa la consola.");
      }
    });
    }
  }

  limpiarFormulario() {
    this.nuevaMascota = {
      id: null, nombre: '', especie: 'PERRO', raza: '', tamano: 'MEDIANO',
      sexo: 'MACHO', pesoActual: 0, fechaNacimientoAprox: '',
      fotoUrl: '', descripcionPerfil: '', estadoAdopcion: 'DISPONIBLE',
      aptoParaAdopcion: true
    };
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        // Llamamos al servicio
        this.mascotaService.eliminarMascota(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'La mascota ha sido borrada.', 'success');
            this.cargarMascotas(); // Recargamos la tabla
          },
          error: (e) => {
            console.error(e);
            Swal.fire('Error', 'No se pudo eliminar', 'error');
          }
        });

      }
    });
  }

  editar(mascota: any) {
    this.nuevaMascota = {...mascota};
    this.mostrarFormulario = true;
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  finalizarGuardado() {
    this.mostrarFormulario = false;
    this.cargarMascotas();
    this.limpiarFormulario();
  }


}
