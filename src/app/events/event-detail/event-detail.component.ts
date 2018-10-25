import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../event';
import { EventService } from '../event.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event$: Observable<Event[]>;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.eventService.getEvent(params.get('id')).valueChanges())
    );
  }

  goToEvents() {
    this.router.navigate(['/eventos']);
  }

}
