import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListComponent} from './Components/List/List.component'
import { DetailsComponent } from './Components/Details/Details.component'

const routes: Routes = [
  {path:'', component: ListComponent},
  {path:'details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
