import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../event';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  eventAddForm: FormGroup;

  constructor(public eventService: EventService, private formBuilder: FormBuilder, private toastCtrl: ToastController) { }

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
      genres: ['', [
        Validators.compose([
          Validators.required
        ])
      ]],
      ticket: ['', [
        Validators.required
      ]]
    });
  }

  public addEvent() {
    const data: Event = {
      title : this.eventAddForm.value['title'],
      description: this.eventAddForm.value['description'],
      date: this.eventAddForm.value['date'],
      genres: this.eventAddForm.value['genre'],
      ticket: this.eventAddForm.value['ticket']
    };
    this.eventService.addEvent(data);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: '¡Evento agregado correctamente!',
      duration: 2000,
      position: 'bottom'
    });
    return toast.present();
  }

}
