import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { IonicMapComponent } from '../../components/ionic-map/ionic-map.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PasswordResetComponent,
    CompleteProfileComponent,
    IonicMapComponent,
    ProfileFormComponent
  ],
  entryComponents: [ProfileFormComponent]
})
export class AuthModule { }
