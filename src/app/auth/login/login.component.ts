import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder, public loadingCtrl: LoadingController) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.compose([Validators.required, Validators.email])
      ]],
      password: ['', [
        Validators.compose([Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(8),
          Validators.maxLength(25)
        ])
      ]]
    });
  }

  async login() {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];
    await this.auth.emailLogin(email, password).then(() => {
      this.showLoading().then(() => {
        this.router.navigateByUrl('home');
      });
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando',
      duration: 2000
    });
    return await loading.present();
  }

}
