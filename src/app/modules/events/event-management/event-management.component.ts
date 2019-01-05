import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Event } from '../event';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent implements OnInit {

  form: FormGroup;

  constructor(private eventService: EventService, private afs: AngularFirestore, private fb: FormBuilder) {
    this.form = this.fb.group({
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

   reset() {
     this.form.reset();
   }

  ngOnInit() {
  }

  submit(form: FormGroup) {
    const data: Event = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.afs.collection('events').add(data);
      this.reset();
    } else {
      this.afs.doc(`events/${form.value.id}`).update(data);
    }
  }

  /* onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.afs.collection('events').add(data);
    } else {
      this.afs.doc('events/' + form.value.id).update(data);
    }
  }*/

}
