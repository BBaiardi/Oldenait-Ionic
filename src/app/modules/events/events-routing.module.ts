import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventEditComponent } from './event-edit/event-edit.component';

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
    path: 'evento/:id/edit',
    component: EventEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
