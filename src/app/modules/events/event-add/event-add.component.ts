import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../event';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  eventAddForm: FormGroup;

  constructor(public eventService: EventService, private formBuilder: FormBuilder, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.eventAddForm = this.formBuilder.group({
      title: ['', [
        Validators.compose([
          Validators.required,
          Validators.maxLength(20)
        ])
      ]],
      description: ['', [
        Validators.compose([
          Validators.required,
          Validators.maxLength(50)
        ])
      ]],
      date: ['', [
        Validators.compose([
          Validators.required
        ])
      ]],
      genre: ['', [
        Validators.compose([
          Validators.required,
          Validators.maxLength(15)
        ])
      ]]
    });
  }

  public addEvent() {
    const data: Event = {
      title : this.eventAddForm.value['title'],
      description: this.eventAddForm.value['description'],
      date: this.eventAddForm.value['date'],
      genre: this.eventAddForm.value['genre']
    };
    this.eventService.addEvent(data);
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Evento agregado!',
      buttons: ['Ok']
    });
    return alert.present();
  }

}
