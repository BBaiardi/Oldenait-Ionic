import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../../services/db.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  profileForm: FormGroup;
  userId: string;

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private db: DbService,
    public modal: ModalController) {
      this.auth.user$.subscribe(user => {
        if (user) {
          this.userId = user.uid;
        }
      });
     }

  ngOnInit() {
    this.profileForm = this.fb.group({
      displayName: ['', [
        Validators.required
      ]]
    });
  }

  async updateProfile() {
    const data = {
      displayName: this.profileForm.value['displayName']
    };
    this.db.updateAt(`users/${this.userId}`, data);
  }

}
