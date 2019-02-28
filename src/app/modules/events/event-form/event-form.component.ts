import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { DbService } from '../../../services/db.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  eventForm: FormGroup;
  event;

  constructor(private auth: AuthService,
    private db: DbService,
    private fb: FormBuilder,
    public modal: ModalController) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', [
        Validators.compose([
          Validators.required,
          Validators.maxLength(20)
        ])
      ]],
      description: ['', [
        Validators.compose([
          Validators.required,
          Validators.maxLength(200)
        ])
      ]],
      date: ['', [
        Validators.required
      ]],
      genre: ['', [
        Validators.required
      ]],
      ticket: ['', [
        Validators.required
      ]]
    });
  }

  async createEvent() {
    const clubId = await this.auth.clubId();
    const id = this.event ? this.event.id : '';
    const data = {
      clubId,
      ...this.event,
      ...this.eventForm.value
    };
    this.db.updateAt(`events/${id}`, data);
    this.modal.dismiss();
  }

}
