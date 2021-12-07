import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { RegsiterComponent } from './register-component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [RegsiterComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MatGridListModule,
        MatInputModule
    ],
    providers: [],
    exports: [RegsiterComponent],
})
export class RegsiterComponentModule { }
