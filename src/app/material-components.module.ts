import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class MaterialComponents {}