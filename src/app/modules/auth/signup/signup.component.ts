import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder, public loadingCtrl: LoadingController) {
    this.createForm();
   }

  ngOnInit() {
  }

  public createForm() {
    this.signUpForm = this.fb.group({
      displayName: ['', [
        Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])
      ]],
      email: ['', [
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ]],
      password: ['', [
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(8),
          Validators.maxLength(25)
        ])
      ]]
    });
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get controls() {
    return this.signUpForm.controls;
  }

  async signUp() {
    const displayName = this.signUpForm.value['displayName'];
    const email = this.signUpForm.value['email'];
    const password = this.signUpForm.value['password'];
    await this.auth.signUp(email, password).then(() => {
      this.auth.updateProfile(displayName, null).then(() => {
        this.router.navigate(['/']);
      });
    });
  }

}
