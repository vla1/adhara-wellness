import { Component,OnDestroy,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from 'src/app/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit, OnDestroy {
  menuItems: any[] = [];
  private languageSubscription: Subscription | undefined;

  constructor(private http: HttpClient,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.loadServices(lang); // Cargar los datos del idioma seleccionado
    });
  }

  private loadServices(language: string): void {
    this.http.get(`../../../../assets/i18n/${language}.json`).subscribe((data: any) => {
      this.menuItems=data.navbarMenu
    });

  }
  /**
   * Cambiar el idioma de la aplicación
   * @param lang Idioma a cambiar
   */
  changeLanguage(lang: string): void {
    this.languageService.switchLanguage(lang);
  }

  /**
   * Obtener el idioma actual
   */
  get currentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar memory leaks
    this.languageSubscription?.unsubscribe();
  }
}
