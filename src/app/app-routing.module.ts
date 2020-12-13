import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListComponent} from './Components/List/List.component'
import { DetailsComponent } from './Components/Details/Details.component'
import {NotFoundComponent} from './Components/NotFoundPage/NotFound.component'

const routes: Routes = [
  {path:'', component: ListComponent},
  {path:'details/:name', component: DetailsComponent},
  {path:'notfound', component:NotFoundComponent},
  {path:'**', redirectTo:'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
