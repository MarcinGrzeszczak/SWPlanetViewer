import {Component, OnDestroy, OnInit} from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'
import { Router } from '@angular/router'
import {Subscription } from 'rxjs'
import { PlanetsStoreService } from 'src/app/Services/PlanetsStore.service'

@Component({
    selector: 'app-not-found',
    templateUrl: './NotFound.component.html',
    styleUrls: ['./NotFound.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {
    private observer767: Subscription
    private observer480: Subscription

    imageContainerClasses = {
        'image_container': true,
        'image_container_480': false
    }

    errorTextClasses = {
        'error_text':true,
        'error_text_767':false,
        'error_text_480': false
    }

    constructor(private state: PlanetsStoreService, private router: Router,private breakPointObserver: BreakpointObserver) {}

    goToList(): void {
        this.state.planetNotFoundSub.next(false)
      }

    private queries() {
       this.observer767 = this.breakPointObserver.observe(['(max-width: 767px)'])
        .subscribe(breakState => {
            if(breakState.matches) {
                this.errorTextClasses.error_text_767 = true
            }
            else
                this.errorTextClasses.error_text_767 = false
        })

        this.observer480 = this.breakPointObserver.observe(['(max-width: 480px)'])
        .subscribe(breakState => {
            if(breakState.matches) {
                this.errorTextClasses.error_text_480 = true
                this.imageContainerClasses.image_container_480 = true
            }
            else {
                this.errorTextClasses.error_text_480 = false
                this.imageContainerClasses.image_container_480 = false
            }
        })


    }

    ngOnInit(): void {
       this.queries()
    }
    
    ngOnDestroy() {
        this.observer480.unsubscribe()
        this.observer767.unsubscribe()
    }
}