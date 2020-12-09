import { Injectable } from '@angular/core';
import { ApiConnectionService } from './ApiConnection.service';
import {Planet} from '../DataSchemes.model'
import { Observable, Observer, of } from 'rxjs';
import {switchMap, tap, map} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PlanetsStoreService {
    private planetsStore: Planet[] = []
    count:number = 0
    pageSize:number = 10

    constructor(private api : ApiConnectionService) {}


    getPlanets(page: number):Observable<Planet[]> {
        console.log('get')
        console.log(this.planetsStore)
        const startElement = page * this.pageSize
        const fetchDatFromServer = this.api.getPlanetPage(page).pipe(tap(data=> this.planetsStore.push(...data)))
        return of(this.planetsStore.slice(startElement, startElement + this.pageSize))
            .pipe(switchMap(data => {
                if(this.planetsStore.length < startElement){
                console.log('fetching')
                return fetchDatFromServer
                }
                return of(data)
            }))
            
        
    }

}