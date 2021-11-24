import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenComponent } from '../splash/splash';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
@NgModule({
    declarations: [SplashScreenComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
    ],
    providers: [],
    exports: [SplashScreenComponent],
})
export class SplashScreenModule { }
