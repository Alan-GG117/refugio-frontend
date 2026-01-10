import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  credenciales = {
    email: '',
    password: ''
  };

  constructor(private authService: Auth, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.credenciales).subscribe({
      next: (data) => {
        console.log("Login correcto: ", data);

        //Guardar la sesión en el navegador
        this.authService.guardarSesion(data);

        //Redireccionamiento de acuerdo al rol
        if(data.rol === 'ROLE_ADMIN' || data.rol === 'ROLE_VETERINARIO') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
        alert("Error: " + (err.error?.error || "Credenciales invalidas"));
      }
    });
  }
}
