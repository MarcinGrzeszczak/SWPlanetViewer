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
  films: Film[] = [{title:"aaaaa"},{title:"aaaaa"},{title:"aaaaa"},{title:"aaaaa"},{title:"aaaaa"},{title:"aaaaa"},{title:"aaaaa"}]
  residents: Resident[] = []
  details: PlanetDetails = null
  constructor(private route: ActivatedRoute ,private store: PlanetsStoreService) { }



  ngOnInit(): void {
    const planetName =  this.route.snapshot.params['name']
    this.store.getFilms(planetName).subscribe(
        data => {
          this.films = data
        },
        error => {
          console.log(error)
        })
    
    this.store.getResidents(planetName).subscribe(
      data => {
        this.residents = data
      },
      error => {
        console.log(error)
      }
    )

    this.store.getPlanetDetails(planetName).subscribe(planet => {
       this.details = <PlanetDetails> planet
       console.log(this.details)
    }) 
  }

}
