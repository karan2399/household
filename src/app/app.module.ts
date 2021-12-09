import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenModule } from 'src/app/modules/getstarted/components/splash/splash.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegsiterComponent } from './modules/account/components/register/register-component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './modules/account/components/login/login-component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './modules/account/components/home/home-component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidenavComponent } from './modules/account/components/sideMenu/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    RegsiterComponent,
    LoginComponent,
    HomeComponent,
    SidenavComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
