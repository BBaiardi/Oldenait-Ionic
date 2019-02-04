import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Event } from '../event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent implements OnInit {

  events$: Observable<Event[]>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.events$ = this.eventService.getData();
  }
}
