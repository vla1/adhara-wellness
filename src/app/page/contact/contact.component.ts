import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router,
    private languageService: LanguageService,
    private titleService: Title,
    private metaService: Meta
  ) {
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
      this.setSeo(lang, 'contact'); // Llama a la función SEO para 'contact'
    });
  }

  // Función para cargar datos (si el componente necesitara usar datos del JSON directamente)
  private loadContactData(lang: string) {
    // Actualiza la ruta del JSON si el componente necesita datos inyectados por TS
    this.data = `../../../assets/i18n/${lang}.json`;
  }

    private setSeo(lang: string, componentKey: string) {
    this.http.get(`../../../assets/i18n/${lang}/seo.json`).subscribe((data: any) => {
      const seo = data.seo[componentKey];
      const defaultSeo = data.seo.default;
      const currentUrl = `https://www.tuweb.com${this.router.url}`;

      // 1. Título de la Pestaña
      this.titleService.setTitle(seo.title);

      // 2. Meta Descripción (Google)
      this.metaService.updateTag({ name: 'description', content: seo.description }, 'name="description"');

      // 3. Open Graph (Redes Sociales)
      this.metaService.updateTag({ property: 'og:title', content: seo.title }, 'property="og:title"');
      this.metaService.updateTag({ property: 'og:description', content: seo.description }, 'property="og:description"');
      this.metaService.updateTag({ property: 'og:site_name', content: defaultSeo.siteName }, 'property="og:site_name"');
      this.metaService.updateTag({ property: 'og:type', content: 'website' }, 'property="og:type"'); // Siempre "website" para Home

      // 4. Imagen Destacada (Crucial para redes sociales)
      if (seo.ogImage) {
          this.metaService.updateTag({ property: 'og:image', content: seo.ogImage }, 'property="og:image"');
      }

      // 5. Canonical (Ayuda a Google a saber cuál es la URL principal)
      this.metaService.updateTag({ rel: 'canonical', href: seo.canonicalUrl || currentUrl }, 'rel="canonical"');

      // 6. Hreflang (Para SEO multilingüe)
      // Indica a Google las versiones traducidas de esta página
      // Nota: Esto asume que tienes un sistema de ruteo por idioma (/es/contact, /en/contact)
      this.metaService.updateTag({ rel: 'alternate', href: data.seo.contact.canonicalUrl, hreflang: 'es' }, 'hreflang="es"');
      this.metaService.updateTag({ rel: 'alternate', href: data.seo.contact.canonicalUrl, hreflang: 'en' }, 'hreflang="en"');
      // Versión para idiomas sin especificar (generalmente el principal)
      this.metaService.updateTag({ rel: 'alternate', href: data.seo.contact.canonicalUrl, hreflang: 'x-default' }, 'hreflang="x-default"');

      // 7. Idioma del HTML (Fundamental)
      document.documentElement.setAttribute('lang', lang);
    });
  }


  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar memory leaks
    this.languageSubscription?.unsubscribe();
  }
}
