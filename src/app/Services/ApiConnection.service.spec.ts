import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing"
import { ApiConnectionService } from "./ApiConnection.service";
import * as DummyPage2 from '../../../dummyPayloads/planetsPage2'
import * as DummyFilm1 from '../../../dummyPayloads/filmPage1'
import * as DummyResident1 from '../../../dummyPayloads/residentPage1';
import { Planet } from '../DataSchemes.model';
describe('ApiConnectionService', async() => {
    let service: ApiConnectionService;
    let httpMock: HttpTestingController;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[ApiConnectionService]
        }).compileComponents();   
        service = TestBed.inject(ApiConnectionService);
        httpMock = TestBed.inject(HttpTestingController);
    });


    it('should create a service', async() => {
        expect(service).toBeTruthy();
    });

    it('check upgrade http to https ', async() =>{
        //given
        const url = 'http://example.com';
        const expectedUrl = 'https://example.com';

        //when
        service.getResidentByUrl(url).subscribe();

        //then
        const mockedRequest = httpMock.expectOne(expectedUrl);
        expect(mockedRequest.request.url).toEqual(expectedUrl);
        
    });

    describe('getFilmByUrl', async() => {
        it('should return object with film title', async() => {
            //given 
            const url = 'https://swapi.dev/api/films/1/';
            const expectedPayload = {
                title: DummyFilm1.payload.title
            }
            //when
            service.getFilmByUrl(url).subscribe(data => {
                //then
                expect(data).toEqual(expectedPayload);
            });

            httpMock.expectOne(url).flush(DummyFilm1.payload)
        })
    });

    describe('getResidentByUrl', async() => {
        it('should return object with resident name', async() => {
            //given
            const url = 'https://swapi.dev/api/people/1/'
            const expectedPayload = {
                name: DummyResident1.payload.name
            }

            //when
            service.getResidentByUrl(url).subscribe(data => {
                //then
                expect(data).toEqual(expectedPayload)
            })

            httpMock.expectOne(url).flush(DummyResident1.payload)
        })
    });

    describe('getPlanetByUrl', async() => {
        it('should return planet object', async() => {
            //given
            const url = `https://swapi.dev/api/planets/?page=2`;
            const expectedPayload = {
                count:60, 
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
            ]};
            //when
            service.getPlanetByUrl(url).subscribe(data => {
                //then
                expect<any>(data).toEqual(expectedPayload)
            })

            httpMock.expectOne(url).flush(DummyPage2.payload)
        })
    });


    describe('getPlanetPage', async() => {
        let pageNumber: number;

        beforeAll(async() => {
            //given
            pageNumber = 2; 
        })

        it('should get url to planet page [HACKY]', async() => {
            //given 
            spyOn<any>(service, 'fetchPlanet') //spying on private method
            
            const expectedResponse = `https://swapi.dev/api/planets/?page=${pageNumber}`;
            
            //when
            service.getPlanetPage(2);

            //then
            expect(service['fetchPlanet']).toHaveBeenCalledWith(expectedResponse);
        });

       it('should fetch data after choose pageNumber [CLEAN]', async() => {
            //given
            const expectedResponse = `https://swapi.dev/api/planets/?page=${pageNumber}`;
        
            //when
            service.getPlanetPage(pageNumber).subscribe()
            
            //then
            const res = httpMock.expectOne(expectedResponse)
            expect(res.request.method).toBe('GET')
       });

       it('should receive proper data after choosing planet page', async() => {
            //given
            const pageNumber = 2;
            const url = `https://swapi.dev/api/planets/?page=${pageNumber}`
            const expectedPayload = {
                count:60, 
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
            ]};

            //when
            service.getPlanetPage(pageNumber).subscribe(data => {
                //then
                expect<any>(data).toEqual(expectedPayload)
            })

            httpMock.expectOne(url).flush(DummyPage2.payload)
       })
    })
})
