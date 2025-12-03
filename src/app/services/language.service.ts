import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private defaultLang = 'es'; // Idioma por defecto
  private languageSubject = new BehaviorSubject<string>(this.defaultLang);

  constructor(private translate: TranslateService,private router: Router) {
this.initLanguage();
    // Suscribirse a los cambios de ruta para reaccionar si el usuario cambia el prefijo en la URL
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        this.checkLanguageFromUrl();
    });  }

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
    const currentUrl = this.router.url;
    // Reemplaza el prefijo actual de la URL con el nuevo idioma
    const newUrl = currentUrl.replace(/^\/(es|en)\//, `/${lang}/`);

    // Navegar a la nueva URL
    this.router.navigateByUrl(newUrl).then(() => {
        this.translate.use(lang);
        this.languageSubject.next(lang);
    });  }

private checkLanguageFromUrl(): void {
    const url = this.router.url;
    // La URL será /en/home o /es/contact
    const match = url.match(/^\/(\w{2})\//);

    if (match && (match[1] === 'es' || match[1] === 'en')) {
        const langInUrl = match[1];
        if (langInUrl !== this.translate.currentLang) {
            this.switchLanguage(langInUrl);
        }
    }
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
