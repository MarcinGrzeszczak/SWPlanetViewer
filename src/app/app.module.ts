import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import {MaterialComponents} from './material-components.module'

import { AppComponent } from './app.component';
import {HeaderComponent} from './Components/Header/Header.component'
import {FooterComponent} from './Components/Footer/Footer.component'
import {ListComponent} from './Components/List/List.component'
import {LoadingIndicatorComponent} from './Components/LoadingIndicator/LoadingIndicator.component';
import {DetailsComponent} from './Components/Details/Details.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    LoadingIndicatorComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
