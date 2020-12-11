import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './Details.component.html',
  styleUrls: ['./Details.component.css']
})
export class DetailsComponent implements OnInit {

  tiles = [
    {title:'Residents', data:['aaa','bbb','ccc']},
    {title:'Details', data:['aaa','bbb','ccc']},
    {title:'Films', data:['aaa','bbb','ccc']}
  ]
  
  constructor() { }



  ngOnInit(): void {
  }

}
