import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
export interface Service {
  title: string;
  description: string;
  image: string;
  jobs: string[];
}

export interface ServicesData {
  services: {
    [key: string]: Service;
  };
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit{
  serviceId="";
  selectedService: any;
  private languageSubscription: Subscription | undefined;
  private defaultSeo: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private languageService:LanguageService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.route.params.subscribe(params => {
        this.serviceId = params['serviceId'];
        this.loadServiceData(lang);
      });
    });
  }

  loadServiceData(lang:string): void {
    this.http.get(`../../../assets/i18n/${lang}.json`).subscribe((data: any) => {
      this.selectedService = (data.services as any)[this.serviceId] || [];

      // 2. Cargar el JSON de SEO separado
            this.http.get(`../../../assets/i18n/${lang}/seo.json`).subscribe((seoData: any) => {
                this.defaultSeo = seoData.seo.default;

                // 3. Llamar a la función SEO si tenemos datos
                if (this.selectedService) {
                    this.setServiceSeo(seoData.seo.services[this.serviceId], lang);
                }
            });
    });
  }
  /**
     * FUNCIÓN setSeo - Usa el código robusto que ya definimos
     */
    private setServiceSeo(serviceSeoData: any, lang: string): void {

        // El selector de servicio (ej: 'facial-treatments') debe existir en el JSON de SEO
        if (!serviceSeoData || !this.defaultSeo) return;

        // 1. Sanitización de datos (para evitar el error de 'undefined')
        const title = serviceSeoData.title ?? this.selectedService.title ?? '';
        const description = serviceSeoData.description ?? '';
        const ogImage = serviceSeoData.ogImage ?? '';

        // URLs para Hreflang y Canonical
        const canonicalUrl = lang === 'es' ? serviceSeoData.canonicalEs : serviceSeoData.canonicalEn;
        const esUrl = serviceSeoData.canonicalEs ?? '';
        const enUrl = serviceSeoData.canonicalEn ?? '';
        const defaultUrl = this.defaultSeo.defaultUrl ?? 'https://www.tuweb.com/';

        // ----------------------------------------------------
        // A. Título, Meta Descripción, Open Graph, Twitter
        // ----------------------------------------------------
        this.titleService.setTitle(title);
        this.metaService.updateTag({ name: 'description', content: description }, 'name="description"');
        this.metaService.updateTag({ property: 'og:title', content: title }, 'property="og:title"');
        this.metaService.updateTag({ property: 'og:description', content: description }, 'property="og:description"');
        this.metaService.updateTag({ property: 'og:image', content: ogImage }, 'property="og:image"');
        this.metaService.updateTag({ property: 'og:url', content: canonicalUrl }, 'property="og:url"');
        this.metaService.updateTag({ property: 'og:site_name', content: this.defaultSeo.siteName }, 'property="og:site_name"');
        this.metaService.updateTag({ property: 'og:type', content: 'article' }, 'property="og:type"');
        this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' }, 'name="twitter:card"');


        // ----------------------------------------------------
        // B. Canonical y Hreflang (SEO Multilingüe)
        // ----------------------------------------------------
        this.metaService.updateTag({ rel: 'canonical', href: canonicalUrl }, 'rel="canonical"');
        this.metaService.updateTag({ rel: 'alternate', href: esUrl, hreflang: 'es' }, 'hreflang="es"');
        this.metaService.updateTag({ rel: 'alternate', href: enUrl, hreflang: 'en' }, 'hreflang="en"');
        this.metaService.updateTag({ rel: 'alternate', href: defaultUrl, hreflang: 'x-default' }, 'hreflang="x-default"');

        document.documentElement.setAttribute('lang', lang);
    }
}
