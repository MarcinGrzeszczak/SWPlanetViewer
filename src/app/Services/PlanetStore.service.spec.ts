import { inject, TestBed, waitForAsync } from "@angular/core/testing";
import { Observable } from "rxjs";
import { forkJoin } from "rxjs";
import { of,concat, zip } from "rxjs";
import { Planet } from "../DataSchemes.model";
import { ApiConnectionService } from "./ApiConnection.service";
import { PlanetsStoreService } from "./PlanetsStore.service";
let service: PlanetsStoreService;
let apiService: ApiConnectionServiceMock;

describe('PlanetStore.service', () => {
    beforeEach(waitForAsync(() => {   
     TestBed.configureTestingModule({
            providers:[PlanetsStoreService, {provide:ApiConnectionService, useClass:ApiConnectionServiceMock}]
        }).compileComponents();
        service = TestBed.inject(PlanetsStoreService);
        apiService = TestBed.inject(ApiConnectionService);            
    }));

    it('should create service',() => {
        expect(service).toBeTruthy();

    });

    describe('getPlanets', () => {
        let pageNumber: number;
        beforeAll( () => {
            pageNumber = 1;
        });
        it('should fetch planets form api', () => {
            //given
            spyOn(apiService, 'getPlanetPage').and.callThrough();
            //when
            service.getPlanets(pageNumber).subscribe();

            //then
            expect(apiService.getPlanetPage).toHaveBeenCalledOnceWith(pageNumber);
        });

        it('should fetch planets and return array of Planets', (done:DoneFn) => {
            //when
            forkJoin({
                expectedResult: apiService.getPlanetPage(pageNumber), 
                result: service.getPlanets(pageNumber)}).subscribe( res => {
                //then
                expect(res.result[0]).toEqual(res.expectedResult['planets'][0]);
                done()
            })
        }); 

        it('should get planets from cache after first fetching from api', waitForAsync((done => {
            const planetsPayloadMock = {
                count:1, 
                planets:[
                {
                    details: {
                        name: 'Test1',
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
                }]};

            spyOn(apiService,'getPlanetPage').and.callFake((page) => new Observable(obs => {
                obs.next(planetsPayloadMock);
                planetsPayloadMock.planets[0].details.name = 'Test2';
                obs.complete()
            }));
        
            concat(service.getPlanets(1), service.getPlanets(1)).subscribe(data => {
                console.log(data)
                expect<any>(data[0].details.name).toEqual('Test1');
                done()
            })
       })));
    })
})

class ApiConnectionServiceMock {
    public getPlanetPage(page) { 
        return new Observable(obs => {
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
        return new Observable(obs => {
            obs.next({name: 'Luke Skywalker'})
            obs.complete();
        })
    }

    public getFilmByUrl(url) {
        return new Observable(obs => {
            obs.next({title: 'New Hope'})
        })
    }
}