import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({providedIn:'root'})
export class ApiConnectionService {
    private API_URL = 'https://swapi.dev/api'
    private API_RESOURCE = '/planets'

    constructor(private http: HttpClient) {}

    getPlanetPage(page: number = 1) {
        this.http.get(
            this.API_URL + this.API_RESOURCE, 
            {params: new HttpParams().set('page',`${page}`)})
            .subscribe(data => console.log(data))
    }
}