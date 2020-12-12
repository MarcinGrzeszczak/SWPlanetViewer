import { Component, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import {Router} from '@angular/router';
import { PlanetsStoreService } from 'src/app/Services/PlanetsStore.service';

import {PlanetDetails} from '../../DataSchemes.model'

@Component({
    selector: 'app-list',
    templateUrl: './List.component.html',
    styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit{
    private pageSize = 10
    private planetsList: PlanetDetails[] = []
    paginatorLength:number = 0
    paginatorSizeOptions:number[] = [5, this.pageSize, 25, 100]
    pageData: PlanetDetails[] = []
    isDataLoaded = false
    displyedColumns: string[] = ['name','climate','gravity','population']
    

    goToDetails(selectedPlanet:PlanetDetails) {
        this.router.navigate(['/details', selectedPlanet.name])
    }

    constructor(private router: Router,private store: PlanetsStoreService) {}

    loadPageData(pageEvent: PageEvent) {
        const start = pageEvent.pageIndex * pageEvent.pageSize
        const end = start + pageEvent.pageSize
        this.pageData = this.planetsList.slice(start,end)
    }

    private sortData() {
        this.planetsList = this.planetsList.sort((a, b) => {
            if(a.name > b.name) return 1
            if(a.name < b.name) return -1
            return 0
        })
    }

    ngOnInit() {
         this.store.getPlanetsCache().subscribe(data => {
                this.isDataLoaded = true
                this.planetsList.push(... data.map(planet=> planet.details))
                this.sortData()
                this.pageData = this.planetsList.slice(0, this.pageSize)
                this.paginatorLength = this.planetsList.length
            })
    }
}