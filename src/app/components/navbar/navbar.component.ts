import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  logo = '../../../assets/images/logo.png';
  currentLang = 'es'; // Inicializar con el idioma por defecto
  private languageSubscription: Subscription | undefined;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Suscribirse al idioma para actualizar el enlace del logo
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  // Función para construir la ruta al home
  get homeLink(): string[] {
    // Retorna la ruta en el formato que Angular Router espera: ['/idioma', 'ruta']
    return [`/${this.currentLang}`, 'home'];
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }
}
