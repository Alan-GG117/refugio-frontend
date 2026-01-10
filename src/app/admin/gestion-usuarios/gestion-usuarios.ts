import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../services/usuario';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css',
})
export class GestionUsuarios implements OnInit{
  usuarios: any[] = [];

  nuevoUsuario = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    rol: 'ROLE_ADOPTANTE'
  };

  constructor(private usuarioService: Usuario) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerTodos().subscribe({
      next: (data) => this.usuarios = data,
      error: (e) => console.error(e)
    });
  }

  guardar() {
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        Swal.fire('Creado', 'Usuario registrado correctamente', 'success');
        this.cargarUsuarios();
        this.limpiar();
      },
      error: (e) => {
        const mensaje = e.error?.error || 'Error al guardar';
        Swal.fire('Error', mensaje, 'error');
      }
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás deshacer esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe(() => {
          Swal.fire('Eliminado', 'El usuario ha sido borrado', 'success');
          this.cargarUsuarios();
        });
      }
    });
  }

  limpiar() {
    this.nuevoUsuario = { nombre: '', apellidoPaterno: '', apellidoMaterno: '', email: '', password: '', rol: 'ROLE_ADOPTANTE' };
  }
}
