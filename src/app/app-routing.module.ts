import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegsiterComponent } from 'src/app/modules/account/components/register/register-component';
import { HomeComponent } from './modules/account/components/home/home-component';
import { LoginComponent } from './modules/account/components/login/login-component';
import { DashboardComponent, } from './modules/account/components/dashboard/dashboard.component';
import { AuthGuard } from './modules/Guards/AuthGuard/auth.guard';

const routes: Routes = [
    { path: 'register', component: RegsiterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dash', component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    { path: '**', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }