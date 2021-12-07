import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegsiterComponent } from 'src/app/modules/account/components/register/register-component';

const routes: Routes = [
    { path: 'register', component: RegsiterComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }