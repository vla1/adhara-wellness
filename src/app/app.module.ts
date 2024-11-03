import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownMenuComponent } from './components/navbar/dropdown-menu/dropdown-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './page/contact/contact.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { HomeComponent } from './page/home/home.component';
import { HomeServiceComponent } from './components/home-services/home-service.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceComponent } from './page/service/service.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEnvModule } from '@ngx-env/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DropdownMenuComponent,
    ContactComponent,
    AboutUsComponent,
    HomeComponent,
    HomeServiceComponent,
    FooterComponent,
    ServiceComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEnvModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
