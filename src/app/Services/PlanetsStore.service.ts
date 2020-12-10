import { Injectable } from '@angular/core';
import { ApiConnectionService } from './ApiConnection.service';
import {Planet, Resident, Film} from '../DataSchemes.model'
import { Observable, of, forkJoin, concat } from 'rxjs';
import {switchMap, tap, map, expand} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PlanetsStoreService {
    private planetsStore: Planet[] = []
    count:number = 0
    pageSize:number = 10

    constructor(private api : ApiConnectionService) {}


    getPlanets(page: number):Observable<Planet[]> {
        const startElement = page * this.pageSize
        const fetchDataFromServer = this.api.getPlanetPage(page).pipe(tap(data=>{
            this.count = data.count
            this.planetsStore.push(...data.planets)
        }))

        return of(this.planetsStore.slice(startElement, startElement + this.pageSize))
            .pipe(switchMap(data => {
                if(this.planetsStore.length < startElement){
                    return fetchDataFromServer.pipe(map(planetsData => planetsData.planets))
                }
                return of(data)
            }))
    }

    getResidents(planetStoreID: number): Observable<Resident[]> {
        const fetchResidents = forkJoin(this.planetsStore[planetStoreID]._residentsUrls.map(url => this.api.getResidentByUrl(url)))
            .pipe(tap(residents => this.planetsStore[planetStoreID].residents = residents))
        return of(this.planetsStore[planetStoreID].residents)
            .pipe(switchMap(data => {
                if(this.planetsStore[planetStoreID].residents === null && this.planetsStore[planetStoreID]._residentsUrls.length > 0) {
                    return fetchResidents
                }
                return of(data)
            }))
    }

    getFilms(planetStoreID: number): Observable<Film[]> {
        const fetchResidents = forkJoin(this.planetsStore[planetStoreID]._filmsUrls.map(url => this.api.getFilmByUrl(url)))
            .pipe(tap(films => this.planetsStore[planetStoreID].films = films))
        return of(this.planetsStore[planetStoreID].films)
            .pipe(switchMap(data => {
                if(this.planetsStore[planetStoreID].films === null && this.planetsStore[planetStoreID]._filmsUrls.length > 0) {
                    return fetchResidents
                }
                return of(data)
            }))
    }

    getAllPlanets() {
        let currentPage = 2
        const loadRestPages = this.getPlanets(currentPage).pipe(
            expand(() =>{
                if(currentPage > this.count / this.pageSize){
                    return of()
                }
                return this.getPlanets(currentPage++)
            })
        )
        return concat(this.getPlanets(1),loadRestPages)
    
    }

}