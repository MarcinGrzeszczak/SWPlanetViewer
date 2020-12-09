import { Component } from '@angular/core';
import { PlanetsStoreService } from './Services/PlanetsStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private store: PlanetsStoreService){}

  fetchData() {
    this.store.getPlanets(1,3).subscribe(console.log)
  }
}
