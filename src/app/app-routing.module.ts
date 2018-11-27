import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'eventos', loadChildren: './modules/events/events.module#EventsModule' },
  { path: 'login', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'mapa', loadChildren: './pages/google-maps/google-maps.module#GoogleMapsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
