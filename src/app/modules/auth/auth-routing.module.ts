import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

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
        component: CompleteProfileComponent
    },
    {
        path: 'recupero-contraseña',
        component: PasswordResetComponent
    },
    {
        path: 'super-admin',
        component: SuperAdminComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
