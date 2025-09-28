import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.scss']
})
export class HomeServiceComponent implements OnInit{
  services: any = [];
  private languageSubscription: Subscription | undefined;

  constructor(private http: HttpClient,
          private languageService:LanguageService)
          {}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.getLanguageObservable().subscribe((lang) => {
      this.loadServices(lang); // Cargar los datos del idioma seleccionado
    });
  }

  private loadServices(lang:string){
    this.http.get(`../../../assets/i18n/${lang}.json`).subscribe((data: any) => {
      this.services = data.home.homeServices;
    });
  }
}
