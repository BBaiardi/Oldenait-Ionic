import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    IonicModule
  ],
  declarations: [EventListComponent, EventDetailComponent]
})
export class EventsModule { }
