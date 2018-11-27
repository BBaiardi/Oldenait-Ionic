import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

const authRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: SignupComponent
    },
    {
        path: 'perfil',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
