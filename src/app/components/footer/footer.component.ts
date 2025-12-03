import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  // Propiedades de íconos (se mantienen si no se eliminan)
  iFacebook: string;
  // ... (otros íconos) ...

  data: any;
  now: Date = new Date();
  private languageSubscription: Subscription | undefined;

  // ⬅️ NUEVA PROPIEDAD para almacenar el idioma actual
  currentLang = 'es';

  constructor(private languageService: LanguageService) {
    // Inicialización de íconos...
    this.iFacebook = "../../../assets/images/icons/icon-facebook.png";
    // ... (resto de inicializaciones)
  }

  ngOnInit() {
    // Suscribirse al cambio de idioma
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.currentLang = lang; // ⬅️ Guardar el idioma actual
      this.loadFooterData(lang);
    });
  }

  private loadFooterData(lang: string) {
    this.data = `../../../assets/i18n/${lang}.json`;
  }

  /**
   * ⬅ Construye la ruta para cualquier enlace, incluyendo el idioma actual.
   * @param path La ruta base (ej: 'home', 'services/spa-massages')
   * @returns Array de strings para routerLink (ej: ['/es', 'home'])
   */
  getLink(path: string): string[] {
    // Si el path ya tiene un slash inicial, lo quitamos antes de dividirlo
    const segments = path.startsWith('/') ? path.substring(1).split('/') : path.split('/');

    // Creamos el array de ruta: ['/lang', 'segmento1', 'segmento2', ...]
    return [`/${this.currentLang}`, ...segments];
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }
}
