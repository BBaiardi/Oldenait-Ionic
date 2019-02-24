import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
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
    },
    {
        path: 'creacion-perfil',
        component: CompleteProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'recupero-contraseña',
        component: PasswordResetComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
