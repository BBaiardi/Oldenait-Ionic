import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Event } from './event';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsCollection: AngularFirestoreCollection<Event>;
  events$: Observable<Event[]>;

  constructor(private afs: AngularFirestore) {
    this.eventsCollection = afs.collection<Event>('events');
   }

   getData(): Observable<Event[]> {
     return this.events$ = this.eventsCollection.snapshotChanges().pipe(
       map((actions) => {
         return actions.map((a) => {
           const data = a.payload.doc.data();
           return { id: a.payload.doc.id, ...data};
         });
       })
     );
   }

   getEvent(id: string) {
     return this.afs.doc<any>(`events/${id}`);
   }
}

