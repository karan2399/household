import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegsiterComponent } from 'src/app/modules/account/components/register/register-component';
import { HomeComponent } from './modules/account/components/home/home-component';
import { LoginComponent } from './modules/account/components/login/login-component';
import { DashboardComponent, } from './modules/account/components/dashboard/dashboard.component';
import { AuthGuard } from './modules/Guards/AuthGuard/auth.guard';
import { AccountActivationComponent } from './modules/account/components/account-activation/account-activation.component';
import { MyProfileComponent } from './modules/account/components/my-profile/my-profile.component';
import { SelectHomeComponent } from './modules/account/components/select-home/select-home.component';

const routes: Routes = [
    { path: 'accountActivation', component: AccountActivationComponent },
    { path: 'register', component: RegsiterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dash', component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: MyProfileComponent },
            { path: 'select-home', component: SelectHomeComponent },
            { path: '**', component: HomeComponent },
        ],
        canActivate: [AuthGuard],
    },
    { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
    { path: '**', component: LoginComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }