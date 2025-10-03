import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  title = 'adhara-beauty-wellness';
  foto = '../../../assets/images/adhara-images/Logo_adhara_azul.jpg'
  description = 'En Aldhara Beauty & Wellness, nos dedicamos a ofrecerte los mejores tratamientos estéticos y de bienestar. Nuestro equipo de profesionales está comprometido con tu cuidado y relajación, utilizando técnicas innovadoras y productos de alta calidad para garantizar tu satisfacción.';
  description2="Creemos en la belleza que viene de adentro y nos esforzamos por proporcionar un ambiente relajante donde puedas disfrutar de cada momento. Nuestro objetivo es ayudarte a sentirte bien contigo mismo, tanto por dentro como por fuera."
  description3="¡Te invitamos a visitarnos y descubrir la experiencia Aldhara!"
  data:any;
  private languageSubscription: Subscription | undefined;

  constructor(private languageService:LanguageService){
  }
  ngOnInit() {
    // Suscribirse al cambio de idioma
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.loadServices(lang); // Cargar los datos del idioma seleccionado
    });
  }

  private loadServices(lang:string){
    this.data= `../../../assets/i18n/${lang}.json`
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar memory leaks
    this.languageSubscription?.unsubscribe();
  }
}
