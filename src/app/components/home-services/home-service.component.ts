import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-service',
  templateUrl: './home-service.component.html',
  styleUrls: ['./home-service.component.scss']
})
export class HomeServiceComponent implements OnInit{
  services: any = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('../../../assets/homeService.json').subscribe((data: any) => {
      this.services = data.services;
    });
  }

}
