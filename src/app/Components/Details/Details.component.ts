import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetsStoreService } from 'src/app/Services/PlanetsStore.service';
import {Film,Resident, PlanetDetails} from '../../DataSchemes.model'



@Component({
  selector: 'app-details',
  templateUrl: './Details.component.html',
  styleUrls: ['./Details.component.css']
})

export class DetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute ,private store: PlanetsStoreService) { }

  details = { data:{} , isLoaded: false}
  residents = { data: [], isLoaded: false}
  films = {data: [], isLoaded: false}
  planetName=""

  ngOnInit(): void {
    const planetName =  this.route.snapshot.params['name']
    this.planetName = planetName
    this.store.getFilms(planetName).subscribe(
        data => {
          this.films.data = data
          this.films.isLoaded = true
        },
        error => {
          this.store.planetNotFoundSub.next(true)
        })
    
    this.store.getResidents(planetName).subscribe(
      data => {
        this.residents.data = data
        this.residents.isLoaded = true
      },
      error => {
        this.store.planetNotFoundSub.next(true)
      }
    )

    this.store.getPlanetDetails(planetName).subscribe(planet => {
      this.details.data = planet
      this.details.isLoaded = true
    }) 
  }

}
