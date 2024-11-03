/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {
  }
  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      import.meta.env.NG_APP_EMAIL_SERVICE_ID as string,
      import.meta.env.NG_APP_EMAIL_TEMPLATE_ID as string,
      formData,
      import.meta.env.NG_APP_EMAIL_USER_ID as string,
    );
  }
}
