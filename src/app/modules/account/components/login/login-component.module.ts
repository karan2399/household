import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login-component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MatGridListModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    providers: [],
    exports: [LoginComponent],
})
export class LoginComponentModule { }
