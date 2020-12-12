import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import {Router} from '@angular/router';
import {Subscription } from "rxjs";
import { PlanetsStoreService } from 'src/app/Services/PlanetsStore.service';

import {PlanetDetails, Planet} from '../../DataSchemes.model'

@Component({
    selector: 'app-list',
    templateUrl: './List.component.html',
    styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
    private planetsCacheSubscription: Subscription
    private statePageIndexSubscription: Subscription
    private pageSize = 10
    private planetsList: PlanetDetails[] = []
    pageIndex = 0
    paginatorLength:number = 0
    paginatorSizeOptions:number[] = [5, this.pageSize, 25, 100]
    pageData: PlanetDetails[] = []
    isDataLoaded = false
    displyedColumns: string[] = ['name','climate','gravity','population']
    

    goToDetails(selectedPlanet:PlanetDetails) {
        this.store.statePageIndex.next(this.pageIndex)
        this.router.navigate(['/details', selectedPlanet.name])
    }

    constructor(private router: Router,private store: PlanetsStoreService) {}

    loadPageData(pageEvent: PageEvent) {
        this.pageIndex = pageEvent.pageIndex
        this.sliceDataToPage()
    }

    sliceDataToPage() {
        const start = this.pageIndex * this.pageSize
        const end = start + this.pageSize
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
        console.log('init')
        this.statePageIndexSubscription = this.store.statePageIndex.subscribe(num =>{ 
            console.log(num)
            this.pageIndex = num})

        this.planetsCacheSubscription = this.store.getPlanetsCache().subscribe(data => {
                this.isDataLoaded = true
                this.planetsList.push(... data.map(planet=> planet.details))
                this.sortData()
                this.paginatorLength = this.planetsList.length
                this.sliceDataToPage()
            })
    }

    ngOnDestroy() {
        console.log('destroyed')
        this.statePageIndexSubscription.unsubscribe()
        this.planetsCacheSubscription.unsubscribe()
    }
}