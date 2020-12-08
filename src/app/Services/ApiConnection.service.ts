import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import {map} from 'rxjs/operators'

import {Planet} from '../DataSchemes.model'
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class ApiConnectionService {
    private API_URL = 'https://swapi.dev/api'
    private API_PLANET_RESOURCE = '/planets'

    constructor(private http: HttpClient) {}

    getPlanetPage(page: number = 1) {
       const path = this.API_URL + this.API_PLANET_RESOURCE
       const queryParams = new HttpParams().set('page',`${page}`) 

       this.fetchPlanet(path, queryParams).subscribe(data=> console.log(data))
    }

    getPlanetByUrl(url: string) {
       this.fetchPlanet(url).subscribe(data=> console.log(data))
    }

    private fetchPlanet(url: string, params?: HttpParams){
       return this.fetchData(url,params).pipe(map ( (data):Planet[] => {
            const planetPage: Planet[] = []
            data['results'].forEach(planet => {
                planetPage.push({
                    name: planet['name'],
                    rotationPeriod: planet['rotation_period'],
                    oribtalPeriod: planet['orbital_period'],
                    diameter: planet['diameter'],
                    climate: planet['climate'],
                    gravity: planet['gravity'],
                    terrain: planet['terrain'],
                    surfaceWater:planet['surface_water'],
                    population: planet['population'],
                    residents: null,
                    films: null
                })
            })
           
            return planetPage
        }))
    }

    private fetchData(url: string, params?: HttpParams ) {
       return this.http.get(url, {params})
    }
}