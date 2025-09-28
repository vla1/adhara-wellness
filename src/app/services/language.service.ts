import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private defaultLang = 'es'; // Idioma por defecto
  private languageSubject = new BehaviorSubject<string>(this.defaultLang);

  constructor(private translate: TranslateService) {
    this.initLanguage(); // Inicializar el idioma
  }

  /**
   * Inicializa el idioma predeterminado o el último idioma seleccionado
   */
  private initLanguage(): void {
    //const savedLang = localStorage.getItem('language') || this.defaultLang;
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
    this.languageSubject.next(this.defaultLang);
  }

  /**
   * Cambia el idioma de la aplicación
   * @param lang Idioma a establecer (ej: 'en', 'es')
   */
  public switchLanguage(lang: string): void {
    this.translate.use(lang);
    //localStorage.setItem('language', lang); // Guardar preferencia
    this.languageSubject.next(lang); // Notificar cambio de idioma
  }

  /**
   * Obtiene el idioma actual
   * @returns Idioma actual en uso
   */
  public getCurrentLanguage(): string {
    return this.translate.currentLang || this.defaultLang;
  }

  /**
   * Devuelve un observable del idioma actual
   */
  public getLanguageObservable(): Observable<string> {
    return this.languageSubject.asObservable();
  }
}
