import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { EventsRoutingModule } from './events-routing.module';

import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { EventFormComponent } from './event-form/event-form.component';

import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    NgAisModule
  ],
  declarations: [EventListComponent, EventDetailComponent, EventManagementComponent, EventFormComponent],
  entryComponents: [EventFormComponent]
})
export class EventsModule { }
