import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  public completeProfileForm: FormGroup;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.completeProfileForm = this.fb.group({
      displayName: ['', [
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ]]
    });
  }

  takePicture() {
    this.auth.selectImage();
  }

}
