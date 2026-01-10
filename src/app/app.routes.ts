import { Routes } from '@angular/router';
import { Landing } from './public/landing/landing';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';
import { Dashboard } from './admin/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { GestionMascotas } from './admin/gestion-mascotas/gestion-mascotas';
import { GestionSolicitudes } from './admin/gestion-solicitudes/gestion-solicitudes';
import { GestionAcreedores } from './admin/gestion-acreedores/gestion-acreedores';
import { GestionUsuarios } from './admin/gestion-usuarios/gestion-usuarios';
import { HistorialMedico } from './admin/historial-medico/historial-medico';
import { ListaNegraAa } from './admin/lista-negra/lista-negra';
import { GestionCitas } from './admin/gestion-citas/gestion-citas';
;
export const routes: Routes = [
  {path: '', component: Landing},
  {path: 'login', component: Login},
  {path: 'registro', component: Registro},
  {path: 'admin', component: Dashboard, canActivate: [authGuard],
    children: [
      {path: 'mascotas', component: GestionMascotas},
      {path: 'solicitudes', component: GestionSolicitudes },
      {path:'usuarios', component: GestionUsuarios},
      {path: '', redirectTo: 'mascotas', pathMatch: 'full'},
      {path: 'finanzas', component: GestionAcreedores},
      { path: 'lista-negra', component: ListaNegraAa },
      { path: 'mascotas/:id/historial', component: HistorialMedico },
      { path: 'citas', component: GestionCitas }
    ]
  },
  {path: '**', redirectTo:''},
];
