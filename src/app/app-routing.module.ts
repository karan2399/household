import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegsiterComponent } from 'src/app/modules/account/components/register/register-component';
import { HomeComponent } from './modules/account/components/home/home-component';
import { LoginComponent } from './modules/account/components/login/login-component';
import { SidenavComponent } from './modules/account/components/sideMenu/sidenav/sidenav.component';
import { AuthGuard } from './modules/Guards/AuthGuard/auth.guard';

const routes: Routes = [
    { path: 'register', component: RegsiterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent,
         }, //canActivate:[AuthGuard],
    { path: '**', component: SidenavComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }