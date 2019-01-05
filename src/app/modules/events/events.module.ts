import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventEditComponent } from './event-edit/event-edit.component';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EventAddComponent } from './event-add/event-add.component';
import { EventManagementComponent } from './event-management/event-management.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [EventListComponent, EventDetailComponent, EventEditComponent, EventAddComponent, EventManagementComponent]
})
export class EventsModule { }
