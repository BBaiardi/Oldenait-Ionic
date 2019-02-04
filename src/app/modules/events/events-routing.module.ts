import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventManagementComponent } from './event-management/event-management.component';

const routes: Routes = [
  {
    path: '',
    component: EventListComponent,
  },
  {
    path: 'evento/:id',
    component: EventDetailComponent
  },
  {
    path: 'manejo-eventos',
    component: EventManagementComponent
  },
  {
    path: 'agregar-evento',
    component: EventAddComponent
  },
  {
    path: 'evento/:id/edit',
    component: EventEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
