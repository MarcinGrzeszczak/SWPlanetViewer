import { Component } from '@angular/core';
import { PlanetsStoreService } from './Services/PlanetsStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private store: PlanetsStoreService){}
  page = 1
  fetchData() {
    
    this.store.getPlanets(this.page++).subscribe(console.log)
  }

  getData() {
    this.store.getPlanets(2).subscribe(console.log)
  }
}
