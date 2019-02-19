import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClubListComponent
  },
  {
    path: 'club/:id',
    component: ClubDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubsRoutingModule { }
