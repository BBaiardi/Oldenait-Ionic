import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ClubsRoutingModule,
    IonicModule
  ],
  declarations: [ClubListComponent, ClubDetailComponent]
})
export class ClubsModule { }
