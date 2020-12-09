import { Injectable } from '@angular/core';
import { ApiConnectionService } from './ApiConnection.service';
import {Planet} from '../DataSchemes.model'
import { Observable, Observer, of } from 'rxjs';
import {switchMap, tap, map} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PlanetsStoreService {
    private planetsStore: Planet[] = []
    count:number = 60

    constructor(private api : ApiConnectionService) {}


    getPlanets(start:number, end:number): Observable<Planet[]> {
        console.log(this.planetsStore)

        return new Observable( (observer: Observer<Planet[]>) => {
            console.log('cache') 
            if(start < 0 || start > this.count || start > end || end > this.count)
                observer.error('WRONG INDEX DATA')
            observer.next(this.planetsStore)
        }).pipe(
            switchMap(data => {
                console.log('switch')
                if(start > this.planetsStore.length && start < this.count && end > this.planetsStore.length && end < this.count ){
                    console.log('fetching')
                    return this.api.getPlanetPage(1).pipe(tap(data => this.planetsStore.push(...data)))
                }
                return of(data)
            }),
            map(data => data.slice(start,end))
        )

    }

}