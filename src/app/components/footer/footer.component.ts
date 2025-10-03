import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  // Las rutas de los íconos se mantienen, aunque el HTML usa Font Awesome.
  // Podrías considerar eliminar estas propiedades si no se usan en el HTML.
  iFacebook:string;
  iInstagram:string;
  iWhatsapp:string;
  iEmail:string;
  iPhone:string;
  iMobile:string;
  iLocation:string;

  data: any;
  private languageSubscription: Subscription | undefined;

  constructor(private languageService: LanguageService) {
    this.iFacebook = "../../../assets/images/icons/icon-facebook.png"
    this.iInstagram = "../../../assets/images/icons/icon-instagram.jpg"
    this.iWhatsapp = "../../../assets/images/icons/icon-whatsapp.jpg"
    this.iEmail = "../../../assets/images/icons/icon-email.png"
    this.iPhone = "../../../assets/images/icons/icon-phone.jpg"
    this.iMobile = "../../../assets/images/icons/icon-mobile.png"
    this.iLocation = "../../../assets/images/icons/icon-location.png"
  }

  ngOnInit() {
    // Suscribirse al cambio de idioma
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.loadFooterData(lang);
    });
  }

  private loadFooterData(lang: string) {
    // Esto asegura que el componente "sabe" qué idioma se está usando.
    this.data = `../../../assets/i18n/${lang}.json`;
    // En escenarios reales, si la navegación o el footer necesita datos complejos del JSON,
    // se cargarían aquí, pero para pipes simples, solo necesitas la suscripción.
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar memory leaks
    this.languageSubscription?.unsubscribe();
  }
}
