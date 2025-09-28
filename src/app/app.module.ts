import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownMenuComponent } from './components/navbar/dropdown-menu/dropdown-menu.component';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { ContactComponent } from './page/contact/contact.component';
import { HomeComponent } from './page/home/home.component';
import { HomeServiceComponent } from './components/home-services/home-service.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceComponent } from './page/service/service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEnvModule } from '@ngx-env/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DropdownMenuComponent,
    ContactComponent,
    HomeComponent,
    HomeServiceComponent,
    FooterComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEnvModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
