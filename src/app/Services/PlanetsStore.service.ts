import { Injectable } from '@angular/core';
import { ApiConnectionService } from './ApiConnection.service';
import {Planet, Resident, Film,PlanetDetails} from '../DataSchemes.model'
import { Observable,Subject, of, forkJoin, concat, BehaviorSubject } from 'rxjs';
import {switchMap, tap, map, expand, reduce} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PlanetsStoreService {
    private planetsStore: Planet[] = []
    private count:number = 0
    private pageSize:number = 10
    private currentPageIndex = 0

    statePageIndex = new BehaviorSubject<number>(0)

    constructor(private api : ApiConnectionService) {
    }


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

    getPlanetsCache():Observable<Planet[]> {
        return of(this.planetsStore)
    }

    getPlanetDetails(planetName: string): Observable<PlanetDetails> {
        return new Observable (observer => {
            const selectedPlanet = this.planetsStore.filter(planet => planet.details.name === planetName)
            if(selectedPlanet.length === 0)
                return observer.error('planet not found')
            observer.next(selectedPlanet[0].details)
            observer.complete()
        })
    }

    getResidents(planetName: string): Observable<Resident[]> {
        const selectedPlanet = this.planetsStore.filter(planet => planet.details.name === planetName)
        return new Observable(observer => {
            if(selectedPlanet.length === 0)
                return observer.error('planet not found')
            observer.next(selectedPlanet[0].residents)
            observer.complete()
        }).pipe(
            switchMap((data:Resident[]) => {
                if(data === null)
                    return this.fetchResidents(selectedPlanet[0])
                return of(data)
            })
        )
    }

    getFilms(planetName: string): Observable<Film[]> {
        const selectedPlanet = this.planetsStore.filter(planet => planet.details.name === planetName)

        return new Observable( (observer)=> {
            if(selectedPlanet.length === 0)
                return observer.error("planet not found")
            observer.next(selectedPlanet[0].films)
            observer.complete()
        }).pipe(
            switchMap((data:Film[]) => {
                if(data === null)
                    return this.fetchFilms(selectedPlanet[0])
                return of(data)
            })
        )
    }

    private fetchResidents(planet: Planet): Observable<Resident[]> {
        return  forkJoin(planet._residentsUrls.map(url => this.api.getResidentByUrl(url)))
        .pipe(tap(residents => planet.residents = residents))
    }

    private fetchFilms(planet: Planet): Observable<Film[]> {
        return forkJoin(planet._filmsUrls.map(url => this.api.getFilmByUrl(url)))
        .pipe(tap(films => planet.films = films))
    }

    getAllPlanets() {
        let currentPage = 2
        const loadRestPages = this.getPlanets(currentPage).pipe(
            expand(() =>{
                if(currentPage > this.count / this.pageSize){
                    return of()
                }
                return this.getPlanets(currentPage++).pipe()
            })
        )
        return concat(this.getPlanets(1),loadRestPages).pipe(   
            reduce((acc, curr)=> {
            acc.push(...curr)
            return acc
        }, []))
    
    }

}