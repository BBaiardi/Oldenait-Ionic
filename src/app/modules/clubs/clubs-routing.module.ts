import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { AuthGuard } from '../auth/auth.guard';
import { ClubProfileComponent } from './club-profile/club-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ClubListComponent
  },
  {
    path: 'club/:id',
    component: ClubDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-club',
    component: ClubProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubsRoutingModule { }
