import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import {Router} from '@angular/router';
import {concat, Subscription } from "rxjs";
import { flatMap, mergeMap } from "rxjs/operators";
import { PlanetsStoreService } from 'src/app/Services/PlanetsStore.service';

import {PlanetDetails} from '../../DataSchemes.model'

@Component({
    selector: 'app-list',
    templateUrl: './List.component.html',
    styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
    private queryMin767Sub: Subscription
    private queryMax767Sub: Subscription
    private storeSubscription: Subscription

    private planetsList: PlanetDetails[] = []
    private columns = ['name','climate','gravity','population',]
    pageIndex = 0
    paginatorLength:number = 0
    currPageSize = 10
    paginatorSizeOptions:number[] = [5,10, 25, 100]
    pageData: PlanetDetails[] = []
    isDataLoaded = false
    displyedColumns: string[] = []
    

    goToDetails(selectedPlanet:PlanetDetails) {
        this.store.statePageIndex.next(this.pageIndex)
        this.store.statePageSize.next(this.currPageSize)
        this.router.navigate(['/details', selectedPlanet.name])
    }

    constructor(
        private router: Router,
        private store: PlanetsStoreService, 
        private breakPointObserver: BreakpointObserver) {}

    loadPageData(pageEvent: PageEvent) {
        this.currPageSize = pageEvent.pageSize
        this.pageIndex = pageEvent.pageIndex
        this.sliceDataToPage()
    }

    sliceDataToPage() {
        const start = this.pageIndex * this.currPageSize
        const end = start + this.currPageSize
        this.pageData = this.planetsList.slice(start,end)
    }

    private sortData() {
        this.planetsList = this.planetsList.sort((a, b) => {
            if(a.name > b.name) return 1
            if(a.name < b.name) return -1
            return 0
        })
    }

    queries() {
        this.queryMin767Sub = 
        this.breakPointObserver.observe(['(min-width:767px)']).subscribe(dataState => {
            if(dataState.matches){
                this.displyedColumns = this.columns
            }
        })

        this.queryMax767Sub =
        this.breakPointObserver.observe(['(max-width: 767px)']).subscribe(dataState => {
            if(dataState.matches)
                this.displyedColumns = this.columns.slice(0,3)
        })
    }

    ngOnInit() {
        this.queries()
        this.storeSubscription =
            this.store.getPlanetsCache().pipe(
                mergeMap(data => {
                    this.planetsList.push(... data.map(planet=> planet.details))
                    this.paginatorLength = this.planetsList.length
                    return this.store.statePageSize
                }),
                mergeMap(pageSize => {
                    this.currPageSize = pageSize
                    return this.store.statePageIndex
                })
            ).subscribe( pageIndex => {
                this.pageIndex = pageIndex
                this.sortData()
                this.sliceDataToPage()
                this.isDataLoaded = true
            })
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe()
        this.queryMax767Sub.unsubscribe()
        this.queryMin767Sub.unsubscribe()
    }
}