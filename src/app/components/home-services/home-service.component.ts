import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.scss']
})
export class HomeServiceComponent implements OnInit, OnDestroy {

  // Variables a utilizar en el HTML
  services: any[] = [];
  sectionTitle = '';
  buttonText = '';

  private langSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private languageService: LanguageService) {}

  ngOnInit() {
    this.langSubscription = this.languageService.getLanguageObservable().subscribe(lang => {
      this.loadServices(lang);
    });
  }

  // FUNCIÓN AJUSTADA
  private loadServices(lang: string) {
    this.http.get(`../../../assets/i18n/${lang}.json`).subscribe((data: any) => {
      const homeData = data.home.homeServices;

      // Asignar directamente a las variables del componente
      this.services = homeData.services || [];
      this.sectionTitle = homeData.sectionTitle;
      this.buttonText = homeData.btnKnowMode;
    });
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }
}
