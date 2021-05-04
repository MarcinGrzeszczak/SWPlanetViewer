import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetsStoreService } from './Services/PlanetsStore.service';
import {NavigationEnd, Router} from '@angular/router';
import { Subscription } from 'rxjs';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  private notFoundSubject: Subscription
  private planetsLoading: Subscription
  private routerEventsSub: Subscription;
  constructor(private router:Router, private store: PlanetsStoreService) {
    this.routerEventsSub = this.router.events.subscribe(event => {
      console.log(event);
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-8EGLLWQSGV', {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.routerEventsSub.unsubscribe();
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
