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

  loginForm: FormGroup;

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
    await this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password']).then(() => {
      this.loadingCtrl.create({ message: 'Autenticando', duration: 5000 });
    });
    return this.router.navigate(['/']);
  }

}
