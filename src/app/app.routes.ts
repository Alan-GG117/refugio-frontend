import { Routes } from '@angular/router';

// Imports de Componentes
import { Landing } from './public/landing/landing';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';
import { Dashboard } from './admin/dashboard/dashboard';
import { GestionMascotas } from './admin/gestion-mascotas/gestion-mascotas';
import { GestionSolicitudes } from './admin/gestion-solicitudes/gestion-solicitudes';
import { GestionAcreedores } from './admin/gestion-acreedores/gestion-acreedores';
import { GestionUsuarios } from './admin/gestion-usuarios/gestion-usuarios';
import { HistorialMedico } from './admin/historial-medico/historial-medico';
import { ListaNegraAa } from './admin/lista-negra/lista-negra';
import { GestionCitas } from './admin/gestion-citas/gestion-citas';

// Import del Guard y el Layout Nuevo
import { authGuard } from './guards/auth-guard';
import { PublicLayout } from './layout/public-layout/public-layout';

export const routes: Routes = [

  // 1. ZONA PÚBLICA (Con Navbar y Footer)
  {
    path: '',
    component: PublicLayout, // <--- Este es el "marco"
    children: [
      { path: '', component: Landing }, // Se carga por defecto en la raíz
      { path: 'login', component: Login },
      { path: 'registro', component: Registro }
    ]
  },

  // 2. ZONA PRIVADA / ADMIN (Sin Navbar público, protegida)
  {
    path: 'admin',
    component: Dashboard, // Tu Dashboard seguramente ya tiene su propio menú lateral
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'mascotas', pathMatch: 'full' },
      { path: 'mascotas', component: GestionMascotas },
      { path: 'solicitudes', component: GestionSolicitudes },
      { path: 'usuarios', component: GestionUsuarios },
      { path: 'finanzas', component: GestionAcreedores },
      { path: 'lista-negra', component: ListaNegraAa },
      { path: 'mascotas/:id/historial', component: HistorialMedico },
      { path: 'citas', component: GestionCitas }
    ]
  },

  // 3. WILDCARD (Cualquier ruta desconocida va al inicio)
  { path: '**', redirectTo: '' }
];
