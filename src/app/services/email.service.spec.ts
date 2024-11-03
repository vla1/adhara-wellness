/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {}

  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_USER_ID'
    );
  }
}
