import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import servicesData from '../../../assets/services.json';
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

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = params['serviceId'];
      this.loadServiceData();
    });
  }

  loadServiceData(): void {
    this.selectedService = (servicesData.services as any)[this.serviceId] || [];
  }
}
