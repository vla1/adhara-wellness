import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { HomeComponent } from './page/home/home.component';
import { ServiceComponent } from './page/service/service.component';

const routes: Routes = [
  { path: '', redirectTo: '/es/home', pathMatch: 'full' },
  { path: 'home', redirectTo: '/es/home', pathMatch: 'full' },
  { path: 'services', redirectTo: '/es/services', pathMatch: 'full' },
  { path: 'services/:serviceId', redirectTo: '/es/services/:serviceId', pathMatch: 'full' },
  { path: 'contact', redirectTo: '/es/contact', pathMatch: 'full' },
  // Rutas con prefijo de Idioma (:lang)
  {
    path: ':lang', // Captura 'es' o 'en'
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'services', component: ServiceComponent },
      { path: 'services/:serviceId', component: ServiceComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },
  { path: '**', redirectTo: '/es/home' } // Redirige al home en español por defecto
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
