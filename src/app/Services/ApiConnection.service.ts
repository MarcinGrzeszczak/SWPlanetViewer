import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import {map} from 'rxjs/operators'

import {Planet, Resident, Film} from '../DataSchemes.model'
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class ApiConnectionService {
    private API_URL = 'https://swapi.dev/api'
    private API_PLANET_RESOURCE = '/planets'

    constructor(private http: HttpClient) {}

    getPlanetPage(page: number = 1): Observable<Planet[]> {
       const path = this.API_URL + this.API_PLANET_RESOURCE
       const queryParams = new HttpParams().set('page',`${page}`) 

       return this.fetchPlanet(path, queryParams)
    }

    getPlanetByUrl(url: string): Observable<Planet[]> {
       return this.fetchPlanet(url)
    }

    getResidentByUrl(url: string): Observable<Resident> {
      return this.fetchData(url).pipe(map ((data): Resident => {
            return {
                name: data['name']
            }
        }))
    }    

    getFilmByUrl(url: string): Observable<Film> {
      return  this.fetchData(url).pipe(map((data): Film=> {
            return {
                title: data['title']
            }
        }))
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
                    films: null,
                    _filmsUrls: planet['films'],
                    _residentsUrls: planet['residents']
                })
            })
            return planetPage
        }))
    }

    private fetchData(url: string, params?: HttpParams ) {
       return this.http.get(url, {params})
    }
}