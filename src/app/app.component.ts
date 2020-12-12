import { Component, OnInit } from '@angular/core';
import { PlanetsStoreService } from './Services/PlanetsStore.service';
import {Planet} from './DataSchemes.model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    constructor(private router:Router, private store: PlanetsStoreService) {}
    isDataLoaded = false
    ngOnInit() {
        this.store.getAllPlanets().subscribe(() => {
          this.isDataLoaded = true
        })
    }
}
