import { Component, OnInit } from "@angular/core";
import { PlanetsStoreService } from 'src/app/Services/PlanetsStore.service';

import {Planet} from '../../DataSchemes.model'

@Component({
    selector: 'app-list',
    templateUrl: './List.component.html',
    styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit{
    isDataLoaded = false
    displyedColumns: string[] = ['name','climate','gravity','population']
    planetsList: Planet[] = []

    constructor(private store: PlanetsStoreService) {}

    ngOnInit() {
        this.store.getAllPlanets().subscribe(data =>{ 
            this.planetsList.push(...data)
        },error => console.log(error), 
        ()=> {
            this.isDataLoaded = true
        })
    }
}