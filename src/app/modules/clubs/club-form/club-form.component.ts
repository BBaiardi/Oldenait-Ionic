import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { DbService } from '../../../services/db.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss']
})
export class ClubFormComponent implements OnInit {

  clubForm: FormGroup;
  club;

  constructor(private auth: AuthService,
    private db: DbService,
    private fb: FormBuilder,
    public modal: ModalController) { }

  ngOnInit() {
    this.clubForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      website: ['', [
        Validators.required
      ]],
      rrpp_name: ['', [
        Validators.required
      ]],
      rrpp_tel: ['', [
        Validators.required
      ]]
    });
  }

  async updateClub() {
    const clubId = await this.auth.clubId();
    const data = {
      ...this.clubForm.value
    };
    this.db.updateAt(`clubs/${clubId}`, data);
    this.modal.dismiss();
  }

}
