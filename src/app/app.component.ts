import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetsStoreService } from './Services/PlanetsStore.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  private notFoundSubject: Subscription
  private planetsLoading: Subscription
  constructor(private router:Router, private store: PlanetsStoreService) {}
  ngOnDestroy(): void {
    this.notFoundSubject.unsubscribe()
    this.planetsLoading.unsubscribe()
  }
  isDataLoaded = false
  ngOnInit() {
      this.notFoundSubject = this.store.planetNotFoundSub.subscribe(
        value => {
          if(value){
            this.router.navigateByUrl('/notfound')
          }
          else {
            this.router.navigate([''])
          }
        }
      )
      this.planetsLoading = this.store.getAllPlanets().subscribe(() => {
        this.isDataLoaded = true
      })
  }
}
