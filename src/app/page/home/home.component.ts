import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'adhara-beauty-wellness';
  foto = '../../../assets/images/foto1.jpg'
  description = 'En Aldhara Beauty & Wellness, nos dedicamos a ofrecerte los mejores tratamientos estéticos y de bienestar. Nuestro equipo de profesionales está comprometido con tu cuidado y relajación, utilizando técnicas innovadoras y productos de alta calidad para garantizar tu satisfacción.';
  description2="Creemos en la belleza que viene de adentro y nos esforzamos por proporcionar un ambiente relajante donde puedas disfrutar de cada momento. Nuestro objetivo es ayudarte a sentirte bien contigo mismo, tanto por dentro como por fuera."
  description3="¡Te invitamos a visitarnos y descubrir la experiencia Aldhara!"

}
