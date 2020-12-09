import { Component } from '@angular/core';
import { PlanetsStoreService } from './Services/PlanetsStore.service';
import {Planet} from './DataSchemes.model'
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

  getResidents() {
    this.store.getResidents(0).subscribe(console.log)
  }
  getFilms() {
    this.store.getFilms(0).subscribe(console.log)
    let planet: Planet = null
    this.store.getPlanets(0).subscribe(data=> planet = data[1])
    planet.gravity = '-121234567'
  }
}
