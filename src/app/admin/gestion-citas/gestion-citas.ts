import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cita } from '../../services/cita';
import { Mascotas } from '../../services/mascotas';
import { Usuario } from '../../services/usuario';

@Component({
  selector: 'app-gestion-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-citas.html',
  styleUrl: './gestion-citas.css',
})
export class GestionCitas implements OnInit{
  citas: any[] = [];
  mascotas: any[] = [];
  usuarios: any[] = [];

  nuevaCita = {
    adoptanteId: null,
    mascotaId: null,
    fechaHora: '',
    comentarios: ''
  };

  constructor(
    private citaService: Cita,
    private mascotaService: Mascotas,
    private usuarioService: Usuario
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.citaService.listar().subscribe(data => this.citas = data);
    this.mascotaService.obtenerTodas().subscribe(data => this.mascotas = data);
    this.usuarioService.obtenerTodos().subscribe(data => this.usuarios = data);
  }

  guardar() {
    if (!this.nuevaCita.adoptanteId || !this.nuevaCita.fechaHora) {
        Swal.fire('Error', 'Faltan datos obligatorios', 'warning');
        return;
    }
    this.citaService.agendar(this.nuevaCita).subscribe({
      next: () => {
        Swal.fire('Agendada', 'Cita registrada', 'success');
        this.cargarDatos();
        this.limpiar();
      },
      error: () => Swal.fire('Error', 'No se pudo agendar', 'error')
    });
  }

  // NUEVO: Función para cambiar estado
  actualizarEstado(cita: any, nuevoEstado: string) {
    this.citaService.cambiarEstado(cita.id, nuevoEstado).subscribe({
      next: () => {
        const Toast = Swal.mixin({
          toast: true, position: 'top-end', showConfirmButton: false, timer: 3000
        });
        Toast.fire({ icon: 'success', title: `Cita ${nuevoEstado}` });
        this.cargarDatos();
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar', 'error')
    });
  }

  limpiar() {
    this.nuevaCita = { adoptanteId: null, mascotaId: null, fechaHora: '', comentarios: '' };
  }
}
