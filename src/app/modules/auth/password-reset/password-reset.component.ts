import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public passwordResetForm: FormGroup;

  constructor(public auth: AuthService, public fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.passwordResetForm = this.fb.group({
      email: ['', [
        Validators.required
      ]]
    });
  }

  get email() {
    return this.passwordResetForm.get('email');
  }

  passwordReset() {
    const email = this.passwordResetForm.value['email'];
    return this.auth.passwordReset(email);
  }

}
