import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router,
    private languageService:LanguageService,
    private titleService:Title,
    private metaService:Meta) {}

  ngOnInit() {
    // Suscribirse al cambio de idioma
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.loadServices(lang); // Cargar los datos del idioma seleccionado
      this.setSeo(lang, 'home'); // Llama a la función SEO para 'home'
    });
  }

  private loadServices(lang:string){
    this.data= `../../../assets/i18n/${lang}.json`
  }

  // NUEVA FUNCIÓN GENÉRICA PARA ESTABLECER EL SEO
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
      // Nota: Esto asume que tienes un sistema de ruteo por idioma (/es/home, /en/home)
      this.metaService.updateTag({ rel: 'alternate', href: data.seo.home.canonicalUrl, hreflang: 'es' }, 'hreflang="es"');
      this.metaService.updateTag({ rel: 'alternate', href: data.seo.home.canonicalUrl, hreflang: 'en' }, 'hreflang="en"');
      // Versión para idiomas sin especificar (generalmente el principal)
      this.metaService.updateTag({ rel: 'alternate', href: data.seo.home.canonicalUrl, hreflang: 'x-default' }, 'hreflang="x-default"');

      // 7. Idioma del HTML (Fundamental)
      document.documentElement.setAttribute('lang', lang);
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar memory leaks
    this.languageSubscription?.unsubscribe();
  }
}
