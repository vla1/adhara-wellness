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
    });
  }
}
