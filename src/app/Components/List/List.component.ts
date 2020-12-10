import { Component, OnInit } from "@angular/core";
import { PlanetsStoreService } from 'src/app/Services/PlanetsStore.service';

import {Planet} from '../../DataSchemes.model'

@Component({
    selector: 'app-list',
    templateUrl: './List.component.html',
    styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit{
    displyedColumns: string[] = ['name','climate','gravity','population']
    planetsList: Planet[] = []

    constructor(private store: PlanetsStoreService) {}

    ngOnInit() {
        this.store.getPlanets(1).subscribe(planets => this.planetsList.push(...planets))
    }
}