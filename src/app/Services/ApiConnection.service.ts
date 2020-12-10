import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'
import {map} from 'rxjs/operators'

import ShortUniqueId from 'short-unique-id'

import {Planet, Resident, Film} from '../DataSchemes.model'
import { Observable } from 'rxjs';

export interface ApiPlanetData {
    count: number,
    planets: Planet[]
}

@Injectable({providedIn:'root'})
export class ApiConnectionService {
    private API_URL = 'https://swapi.dev/api'
    private API_PLANET_RESOURCE = '/planets'
    private shortId: ShortUniqueId

    constructor(private http: HttpClient) {
        this.shortId = new ShortUniqueId({
            length: 2
        })
    }

    getPlanetPage(page: number = 1): Observable<ApiPlanetData> {
       const path = this.API_URL + this.API_PLANET_RESOURCE
       const queryParams = new HttpParams().set('page',`${page}`) 

       return this.fetchPlanet(path, queryParams)
    }

    getPlanetByUrl(url: string): Observable<ApiPlanetData> {
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
       return this.fetchData(url,params).pipe(map ( (data):ApiPlanetData => {
            const planetPage: Planet[] = []
            data['results'].forEach(planet => {
                planetPage.push({
                    storeID: this.shortId.randomUUID(),
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
            return {count: +data['count'] , planets:planetPage}
        }))
    }

    private fetchData(url: string, params?: HttpParams ) {
       return this.http.get(url, {params})
    }
}