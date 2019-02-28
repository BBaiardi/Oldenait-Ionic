import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubProfileComponent } from './club-profile/club-profile.component';
import { ClubFormComponent } from './club-form/club-form.component';

@NgModule({
  imports: [
    CommonModule,
    ClubsRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [ClubListComponent, ClubDetailComponent, ClubProfileComponent, ClubFormComponent],
  entryComponents: [ClubFormComponent]
})
export class ClubsModule { }
