import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home-component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MatGridListModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    providers: [],
    exports: [HomeComponent],
})
export class HomeComponentModule { }
