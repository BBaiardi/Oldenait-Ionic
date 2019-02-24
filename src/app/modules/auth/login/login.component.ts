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
import {
  LoadingController} from '@ionic/angular';
import {
  Facebook} from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder, public loadingCtrl: LoadingController,
     public facebook: Facebook) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.compose([Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ]],
      password: ['', [
        Validators.compose([Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
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

  async fbLogin() {
    await this.auth.fbLogin().then(() => {
      this.router.navigateByUrl('home');
    });
  }

  async gpLogin() {
    await this.auth.googlePlusLogin().then(() => {
      this.router.navigateByUrl('home');
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 2000
    });
    return await loading.present();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
