import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../club';
import { Event } from '../../events/event';
import { ClubService } from '../club.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent implements OnInit {

  club$: Observable<Club[]>;
  events$: Observable<Event[]>;
  private eventsCollectionRef: AngularFirestoreCollection<Event>;

  constructor(private clubService: ClubService, private route: ActivatedRoute, private afs: AngularFirestore) {
    const clubId = this.route.snapshot.paramMap.get('id');
    this.eventsCollectionRef = this.afs.collection<Event>('events', ref => ref.where('clubId', '==', clubId ));
    this.events$ = this.eventsCollectionRef.valueChanges();
   }

  ngOnInit() {
    this.club$ = this.route.paramMap.pipe(
      switchMap((params) =>
      this.clubService.getClub(params.get('id')))
    );
  }

}
