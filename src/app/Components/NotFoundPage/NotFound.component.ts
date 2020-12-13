import {Component, OnInit} from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
    selector: 'app-not-found',
    templateUrl: './NotFound.component.html',
    styleUrls: ['./NotFound.component.css']
})
export class NotFoundComponent implements OnInit {
    imageContainerClasses = {
        'image_container': true,
        'image_container_480': false
    }

    errorTextClasses = {
        'error_text':true,
        'error_text_767':false,
        'error_text_480': false
    }

    constructor(private breakPointObserver: BreakpointObserver) {}

    private queries() {
        this.breakPointObserver.observe(['(max-width: 767px)'])
        .subscribe(breakState => {
            if(breakState.matches) {
                this.errorTextClasses.error_text_767 = true
            }
            else
                this.errorTextClasses.error_text_767 = false
        })

        this.breakPointObserver.observe(['(max-width: 480px)'])
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
    
}