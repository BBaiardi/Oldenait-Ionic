import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {

  addAdminForm: FormGroup;

  constructor(private fns: AngularFireFunctions, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.addAdminForm = this.fb.group({
      email: ['', [
        Validators.required
      ]]
    });
  }

  addAdmin() {
    const addAdmin = this.fns.httpsCallable('addAdmin');
    const adminEmail = this.addAdminForm.value['email'];
    addAdmin({ email: adminEmail }).subscribe(() => {
      console.log(`Permiso de administrador otorgado a ${adminEmail}`);
    });
  }

}
