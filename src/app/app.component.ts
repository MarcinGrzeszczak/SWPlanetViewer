import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from './Services/ApiConnection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private api : ApiConnectionService) {}
  
  ngOnInit(): void {
    this.api.getPlanetPage()
  }
}
