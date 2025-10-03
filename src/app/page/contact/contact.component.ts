import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service'; // Asumiendo esta ruta

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  // Propiedades de íconos mantenidas para compatibilidad con el HTML anterior
  iFacebook: string;
  iInstagram: string;
  iWhatsapp: string;
  iEmail: string;
  iPhone: string;
  iMobile: string;
  iLocation: string;

  // Añadimos las propiedades para la lógica de suscripción
  data: any;
  private languageSubscription: Subscription | undefined;

  constructor(private languageService: LanguageService) {
    // Inicialización de rutas de íconos (no se traducen)
    this.iFacebook = "../../../assets/images/icons/icon-facebook.png";
    this.iInstagram = "../../../assets/images/icons/icon-instagram.jpg";
    this.iWhatsapp = "../../../assets/images/icons/icon-whatsapp.jpg";
    this.iEmail = "../../../assets/images/icons/icon-email.png";
    this.iPhone = "../../../assets/images/icons/icon-phone.jpg";
    this.iMobile = "../../../assets/images/icons/icon-mobile.png";
    this.iLocation = "../../../assets/images/icons/icon-location.png";
  }

  ngOnInit() {
    // Suscribirse al cambio de idioma (igual que en HomeComponent)
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.loadContactData(lang); // Llamar a la función de carga
    });
  }

  // Función para cargar datos (si el componente necesitara usar datos del JSON directamente)
  private loadContactData(lang: string) {
    // Actualiza la ruta del JSON si el componente necesita datos inyectados por TS
    this.data = `../../../assets/i18n/${lang}.json`;
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar memory leaks
    this.languageSubscription?.unsubscribe();
  }
}
