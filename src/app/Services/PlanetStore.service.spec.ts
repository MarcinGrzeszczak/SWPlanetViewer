import { inject, TestBed } from "@angular/core/testing";
import * as rxjs from "rxjs";
import { concatMap } from "rxjs/operators";
import { ApiConnectionService } from "./ApiConnection.service";
import { PlanetsStoreService } from "./PlanetsStore.service";
let service: PlanetsStoreService;
let apiService: ApiConnectionServiceMock;

describe('PlanetStore.service', async() => {
    beforeEach(async() => {
       await TestBed.configureTestingModule({
            providers:[PlanetsStoreService, {provide:ApiConnectionService, useClass:ApiConnectionServiceMock}]
        }).compileComponents();
        service = TestBed.inject(PlanetsStoreService);
        apiService = TestBed.inject(ApiConnectionService);            
    });

    it('should create service', async() => {
        expect(service).toBeTruthy();

    })

    describe('getPlanets', async() => {
        let pageNumber: number;
        beforeAll( async()=> {
            pageNumber = 1;
        });
        // it('should fetch planets form api', async() => {
        //     //given
        //     const methodSpy = spyOn(apiService, 'getPlanetPage').and.callThrough();
        //     //when
        //     service.getPlanets(pageNumber).subscribe();

        //     //then
        //     expect(methodSpy).toHaveBeenCalledOnceWith(pageNumber);
        // });

        // it('should fetch planets and return array of Planets', async() => {
        //     //when
        //     zip(apiService.getPlanetPage(pageNumber), service.getPlanets(pageNumber)).subscribe( (data: [{planets}, []]) => {
        //         //given
        //         const expectedResult = data[0].planets;
            
        //         //then
        //         const result = data[1];
        //         expect(result).toEqual(expectedResult);
        //     })
        // }); 

        it('should get planets from cache after first fetching from api', async() => {
            const spyOfRxjs = spyOnProperty(rxjs,'Observable','get')
            service.getPlanets(pageNumber).pipe(
                concatMap( () => {
                    return service.getPlanets(pageNumber);
                })
            ).subscribe(data => {
                expect(spyOfRxjs).toHaveBeenCalled()
            })
        });
    })
})

class ApiConnectionServiceMock {
    public getPlanetPage(page) { 
        return new rxjs.Observable(obs => {
        obs.next({
            count:2, 
            planets:[
            {
                details: {
                    name: "Geonosis", 
                    rotationPeriod: "30", 
                    oribtalPeriod: "256", 
                    diameter: "11370", 
                    climate: "temperate, arid", 
                    gravity: "0.9 standard", 
                    terrain: "rock, desert, mountain, barren", 
                    surfaceWater: "5", 
                    population: "100000000000"
                },
                residents: null,
                films: null,
                _filmsUrls: ["http://swapi.dev/api/films/5/"],
                _residentsUrls: ["http://swapi.dev/api/people/63/"]
            },
            {
                details: {
                    name: "Utapau", 
                    rotationPeriod: "27", 
                    oribtalPeriod: "351", 
                    diameter: "12900", 
                    climate: "temperate, arid, windy", 
                    gravity: "1 standard", 
                    terrain: "scrublands, savanna, canyons, sinkholes", 
                    surfaceWater: "0.9", 
                    population: "95000000"
                },
                residents: null,
                films: null,
                _filmsUrls: ["http://swapi.dev/api/films/6/"],
                _residentsUrls: ["http://swapi.dev/api/people/83/"]
            }
        ]});
        obs.complete();
        })
    }

    public getResidentByUrl(url) { 
        return new rxjs.Observable(obs => {
            obs.next({name: 'Luke Skywalker'})
            obs.complete();
        })
    }

    public getFilmByUrl(url) {
        return new rxjs.Observable(obs => {
            obs.next({title: 'New Hope'})
        })
    }
}