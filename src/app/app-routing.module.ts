import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'eventos', loadChildren: './modules/events/events.module#EventsModule' },
  { path: 'login', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'mapa', loadChildren: './pages/google-maps/google-maps.module#GoogleMapsPageModule' },
  { path: 'admin-dashboard', loadChildren: './pages/admin-dashboard/admin-dashboard.module#AdminDashboardPageModule' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
