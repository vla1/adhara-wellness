import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { HomeComponent } from './page/home/home.component';
import { ServiceComponent } from './page/service/service.component';

const routes: Routes = [
  { path: '', redirectTo: '/es/home', pathMatch: 'full' },
  // Esta ruta captura el prefijo del idioma
  {
    path: ':lang', // para capturar el idioma
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'services', component: ServiceComponent },
      { path: 'services/:serviceId', component: ServiceComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },

  // 3. Comodín Final (Si el prefijo no es válido o si alguien teclea cualquier cosa)
  { path: '**', redirectTo: '/es/home' } // Vuelve al idioma por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
