import { Component, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { PlanetsStoreService } from 'src/app/Services/PlanetsStore.service';

import {Planet} from '../../DataSchemes.model'

@Component({
    selector: 'app-list',
    templateUrl: './List.component.html',
    styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit{
    private pageSize = 10
    private planetsList: Planet[] = []
    paginatorLength:number = 0
    paginatorSizeOptions:number[] = [5, this.pageSize, 25, 100]
    pageData: Planet[] = []
    isDataLoaded = false
    displyedColumns: string[] = ['name','climate','gravity','population']
    


    constructor(private store: PlanetsStoreService) {}

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
        this.store.getAllPlanets().subscribe(data =>{ 
            this.planetsList.push(...data)
        },error => console.log(error), 
        ()=> {
            this.sortData()
            this.isDataLoaded = true
            this.paginatorLength = this.planetsList.length
            this.pageData = this.planetsList.slice(0,this.pageSize)
        })
    }
}