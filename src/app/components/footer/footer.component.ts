import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  iFacebook:string;
  iInstagram:string;
  iWhatsapp:string;
  iEmail:string;
  iPhone:string;
  iMobile:string;
  iLocation:string;

  constructor(){
    this.iFacebook = "../../../assets/images/icons/icon-facebook.png"
    this.iInstagram = "../../../assets/images/icons/icon-instagram.jpg"
    this.iWhatsapp = "../../../assets/images/icons/icon-whatsapp.jpg"
    this.iEmail = "../../../assets/images/icons/icon-email.png"
    this.iPhone = "../../../assets/images/icons/icon-phone.jpg"
    this.iMobile = "../../../assets/images/icons/icon-mobile.png"
    this.iLocation = "../../../assets/images/icons/icon-location.png"
  }
}
