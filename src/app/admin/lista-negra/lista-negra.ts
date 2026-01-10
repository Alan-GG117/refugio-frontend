import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListaNegra } from '../../services/lista-negra';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-negra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-negra.html',
  styleUrl: './lista-negra.css',
})
export class ListaNegraAa implements OnInit{

  vetados: any[] = [];

  nuevoVeto = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    identificacionOficial: '',
    motivo: '',
    adminId: 2 // Por defecto, luego tomaremos el del login
  };

  constructor(private listaNegraService: ListaNegra) {}

  ngOnInit() {
    this.cargarLista();

    // Intentar obtener el ID del admin logueado
    const sesion = localStorage.getItem('usuario_sesion');
    if (sesion) {
      const usuario = JSON.parse(sesion);
      this.nuevoVeto.adminId = usuario.id || usuario.usuarioId;
    }
  }

  cargarLista() {
    this.listaNegraService.obtenerTodos().subscribe(data => {
      this.vetados = data;
    });
  }

  guardar() {
    this.listaNegraService.bloquear(this.nuevoVeto).subscribe({
      next: () => {
        Swal.fire('Bloqueado', 'Usuario añadido a la lista negra', 'warning');
        this.cargarLista();
        this.limpiar();
      },
      error: () => Swal.fire('Error', 'No se pudo registrar', 'error')
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Perdonar castigo?',
      text: "El usuario podrá volver a adoptar.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, desbloquear'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaNegraService.desbloquear(id).subscribe(() => {
          Swal.fire('Desbloqueado', 'Usuario removido de lista negra', 'success');
          this.cargarLista();
        });
      }
    });
  }

  limpiar() {
    this.nuevoVeto = {
      nombre: '', apellidoPaterno: '', apellidoMaterno: '',
      email: '', identificacionOficial: '', motivo: '', adminId: this.nuevoVeto.adminId
    };
  }
}
