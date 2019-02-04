import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardPage } from './admin-dashboard.page';
import { EventAddComponent } from '../../modules/events/event-add/event-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage
  },
  {
    path: 'agregar-evento',
    component: EventAddComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminDashboardPage]
})
export class AdminDashboardPageModule {}
