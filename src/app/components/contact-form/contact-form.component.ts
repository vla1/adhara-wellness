import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      message: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    // if (this.contactForm.valid) {
    //   const formData = this.contactForm.value;
    //   this.emailService.sendEmail(formData)
    //     .then((response) => {
    //       console.log('Correo enviado con éxito:', response.status, response.text);
    //     })
    //     .catch((error) => {
    //       console.error('Error al enviar el correo:', error);
    //     });
    // }
  }
}
