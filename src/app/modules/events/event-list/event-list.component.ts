import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Event } from '../event';
import { EventService } from '../event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events$: Observable<Event[]>;
  $term: string;

  constructor(private eventService: EventService) {
   }

  ngOnInit() {
    this.events$ = this.eventService.getData();
  }

  search() {
    this.eventService.search();
  }

  searchEvent(term: string) {
    this.eventService.searchEvent(term);
  }

}
