import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenModule } from 'src/app/modules/getstarted/components/splash/splash.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegsiterComponent } from './modules/account/components/register/register-component';
import { AuthInterceptor } from './modules/Guards/AuthGuard/auth.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './modules/account/components/login/login-component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './modules/account/components/home/home-component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './modules/account/components/dashboard/dashboard.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AccountActivationComponent } from './modules/account/components/account-activation/account-activation.component';
import { AuthService } from './modules/account/services/authentication/authentication-service';
import { MyProfileComponent } from './modules/account/components/my-profile/my-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    RegsiterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    AccountActivationComponent,
    MyProfileComponent,

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
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

    ToastrModule.forRoot({
      progressBar: true
    })
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
