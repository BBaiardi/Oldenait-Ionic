import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'home', canActivate: [AuthGuard], loadChildren: './home/home.module#HomePageModule' },
  { path: 'eventos', canActivate: [AuthGuard], loadChildren: './modules/events/events.module#EventsModule' },
  { path: 'clubs', canActivate: [AuthGuard], loadChildren: './modules/clubs/clubs.module#ClubsModule' },
  { path: 'mapa', canActivate: [AuthGuard], loadChildren: './modules/google-maps/google-maps.module#GoogleMapsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
