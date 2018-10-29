import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  declarations: [LoginComponent, SignupComponent],
  exports: [LoginComponent, SignupComponent]
})
export class AuthModule { }
