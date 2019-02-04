import { Component, OnInit } from '@angular/core';
import { EventService } from '../../modules/events/event.service';
import { Observable } from 'rxjs';
import { Event } from '../../modules/events/event';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  events$: Observable<Event[]>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.events$ = this.eventService.getData();
  }

}
