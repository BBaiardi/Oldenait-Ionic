import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  public eventEditForm: FormGroup;

  constructor(public eventService: EventService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.eventEditForm = this.fb.group({
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

  public editEvent(event: Event) {
    const title = this.eventEditForm.value['title'];
    const description = this.eventEditForm.value['description'];
    const date = this.eventEditForm.value['date'];
    const genre = this.eventEditForm.value['genre'];
    const data: Event = {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      genre: event.genre,
      imageUrl: event.imageUrl
    };
    data.title = title;
    data.description = description;
    data.date = date;
    data.genre = genre;
    console.log(data);
    this.eventService.updateEvent(event);
  }

}
