import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.createForm();
   }

  ngOnInit() {
  }

  public createForm() {
    this.signUpForm = this.fb.group({
      email: ['', [
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ]],
      password: ['', [
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ])
      ]],
      admin: ['']
    });
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  async signUp() {
    const email = this.signUpForm.value['email'];
    const password = this.signUpForm.value['password'];
    const admin = this.signUpForm.value['admin'];
    if (admin === true) {
      return this.auth.registerAdmin(email, password).then(() => {
        this.presentToast();
        this.router.navigate(['/creacion-perfil']);
      });
    } else {
      return this.auth.registerUser(email, password).then(() => {
        this.presentToast();
        this.router.navigate(['/home']);
      });
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: '¡El usuario fue creado correctamente!',
      duration: 2000
    });
    toast.present();
  }
}
