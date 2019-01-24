import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';

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
    },
    {
        path: 'creacionperfil',
        component: CompleteProfileComponent
    },
    {
        path: 'recuperocontraseña',
        component: PasswordResetComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
