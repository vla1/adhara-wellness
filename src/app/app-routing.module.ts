import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { HomeComponent } from './page/home/home.component';
import { ServiceComponent } from './page/service/service.component';

const routes: Routes = [
  // 1. Redirección para la RAIZ (si alguien entra a http://dominio.com/)
  { path: '', redirectTo: '/es/home', pathMatch: 'full' },

  // 🚨 2. BLOQUE DE REDIRECCIÓN A IDIOMA POR DEFECTO (ES)
  // Este bloque captura las rutas SIN prefijo de idioma (ej: /home, /contact)
  // y las redirige al formato correcto (/es/home, /es/contact).
  { path: 'home', redirectTo: '/es/home', pathMatch: 'full' },
  { path: 'services', redirectTo: '/es/services', pathMatch: 'full' },
  // Importante: También capturamos la ruta con el parámetro
  { path: 'services/:serviceId', redirectTo: '/es/services/:serviceId', pathMatch: 'full' },
  { path: 'contact', redirectTo: '/es/contact', pathMatch: 'full' },

  // 3. BLOQUE PRINCIPAL: Rutas con prefijo de Idioma (:lang) - Aquí SÍ se cargan los componentes
  {
    path: ':lang', // Captura 'es' o 'en'
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'services', component: ServiceComponent },
      { path: 'services/:serviceId', component: ServiceComponent },
      { path: 'contact', component: ContactComponent },

      // Comodín interno: Si el prefijo es válido (/es), pero la ruta es incorrecta (/es/invalido)
      { path: '**', redirectTo: 'home' }
    ]
  },

  // 4. COMODÍN FINAL: Si la ruta no coincide con el formato /ruta O /:lang/ruta
  { path: '**', redirectTo: '/es/home' } // Redirige al home en español por defecto
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
