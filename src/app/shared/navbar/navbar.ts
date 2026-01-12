import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  usuario: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.verificarSesion();
  }

  verificarSesion() {
    const sesion = localStorage.getItem('usuario_sesion');
    if (sesion) {
      this.usuario = JSON.parse(sesion);
    } else {
      this.usuario = null;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuario_sesion');
    this.usuario = null;
    this.router.navigate(['/login']);
  }
}
