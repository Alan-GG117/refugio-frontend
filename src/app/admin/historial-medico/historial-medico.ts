import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Historial } from '../../services/historial';
import { Mascotas } from '../../services/mascotas';

@Component({
  selector: 'app-historial-medico',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './historial-medico.html',
  styleUrl: './historial-medico.css',
})
export class HistorialMedico implements OnInit{

  mascota: any = {};      // El paciente
  historial: any[] = [];  // Su lista de vacunas/eventos
  usuario: any = {};      // El veterinario logueado

  nuevoEvento = {
    tipo: 'CONSULTA',
    descripcion: '',
    fecha: '',
    mascotaId: 0,
    veterinarioId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private historialService: Historial,
    private mascotaService: Mascotas
  ) {}

  ngOnInit() {
    // 1. Obtener ID de la mascota de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarMascota(Number(id));
      this.cargarHistorial(Number(id));
      this.nuevoEvento.mascotaId = Number(id);
    }

    // 2. Obtener ID del Veterinario (Usuario actual)
    const sesion = localStorage.getItem('usuario_sesion');
    if (sesion) {
      this.usuario = JSON.parse(sesion);
      this.nuevoEvento.veterinarioId = this.usuario.usuarioId || this.usuario.id;
    }

    // 3. Poner fecha de hoy por defecto
    this.nuevoEvento.fecha = new Date().toISOString().split('T')[0];
  }

  cargarMascota(id: number) {
    // Usamos el servicio de mascota para obtener foto y nombre
    this.mascotaService.obtenerTodas().subscribe(lista => {
      this.mascota = lista.find((m: any) => m.id === id);
    });
  }

  cargarHistorial(id: number) {
    this.historialService.obtenerPorMascota(id).subscribe({
      next: (data) => this.historial = data,
      error: (e) => console.error(e)
    });
  }

  guardar() {
    this.historialService.guardar(this.nuevoEvento).subscribe({
      next: () => {
        Swal.fire('Registrado', 'Evento médico guardado', 'success');
        this.cargarHistorial(this.nuevoEvento.mascotaId);
        this.nuevoEvento.descripcion = ''; // Limpiar campo
      },
      error: () => Swal.fire('Error', 'No se pudo guardar', 'error')
    });
  }

}
