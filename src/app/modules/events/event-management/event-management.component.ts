import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Event } from '../event';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { switchMap, shareReplay } from 'rxjs/operators';
import { DbService } from '../../../services/db.service';
import { ModalController } from '@ionic/angular';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent implements OnInit {

  events;

  constructor(public authService: AuthService, public db: DbService, public modal: ModalController ) {
  }

  ngOnInit() {
    this.events = this.authService.user$.pipe(
      switchMap(user =>
        this.db.collection$('events', ref =>
          ref.where('clubId', '==', user.clubId)
      )
    ),
    shareReplay(1));
  }

  async presentEventForm(event?: any) {
    const modal = await this.modal.create({
      component: EventFormComponent,
      componentProps: { event }
    });
    return await modal.present();
  }

  deleteEvent(event) {
    this.db.delete(`events/${event.id}`);
  }
}
