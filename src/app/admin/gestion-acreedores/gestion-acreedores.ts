import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Acreedor } from '../../services/acreedor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-acreedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-acreedores.html',
  styleUrl: './gestion-acreedores.css',
})
export class GestionAcreedores {
  acreedores: any[] = [];

  nuevoAcreedor = {
    id: null,
    razonSocial: '',
    nombreContacto: '',
    apellidoPaternoContacto: '',
    apellidoMaternoContacto: '',
    telefono: '',
    email: '',
    tipoServicio: 'ALIMENTO',
  };

  constructor(private acreedor: Acreedor) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.acreedor.obtenerTodos().subscribe({
      next: (data) => (this.acreedores = data),
      error: (e) => console.error(e),
    });
  }

  guardar() {
    this.acreedor.guardar(this.nuevoAcreedor).subscribe({
      next: () => {
        Swal.fire('Guardado', 'Acreedor registrado', 'success');
        this.cargarDatos();
        this.limpiar();
      },
      error: (e) => {
        console.error(e);
        Swal.fire('Error', 'No se pudo guardar', 'error');
      },
    });
  }

  editar(item: any) {
    this.nuevoAcreedor = { ...item };
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Se borrará este acreedor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.acreedor.eliminar(id).subscribe(() => {
          Swal.fire('Eliminado', '', 'success');
          this.cargarDatos();
        });
      }
    });
  }

  limpiar() {
    this.nuevoAcreedor = {
      id: null,
      razonSocial: '',
      nombreContacto: '',
      apellidoPaternoContacto: '',
      apellidoMaternoContacto: '',
      telefono: '',
      email: '',
      tipoServicio: 'ALIMENTO',
    };
  }
}
