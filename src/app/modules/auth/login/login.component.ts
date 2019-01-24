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
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')])
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

  /*fbLogin() {
    this.facebook.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    .then((res: FacebookLoginResponse) => {
      if (res.status === 'connected') {
        const fb_id = res.authResponse.userID;
        const fb_token = res.authResponse.accessToken;
        this.facebook.api('/me?fields=name,gender,birthday,email', []).then((user) => {
          const gender = user.gender;
          const birthday = user.birthday;
          const name = user.name;
          const email = user.email;
          console.log(`Gender ${gender}, birthday ${birthday}, name ${name}, email ${email}`);
        });
        } else {
          console.log('Ocurrio un error');
        }
      })
      .catch((e) => {
        console.log('Error logueando con Facebook', e);
      });
    }*/

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...',
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
