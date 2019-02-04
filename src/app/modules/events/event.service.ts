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

   getEvents() {
     return this.events$;
   }

   getEvent(id: string) {
     return this.afs.doc<any>(`events/${id}`).valueChanges();
   }

   // Crud methods for events
   async addEvent(event: Event) {
     return this.eventsCollection.add(event)
     .catch(err => {
       console.log(err);
     });
   }

  async updateEvent(event: Event) {
     return this.eventsCollection.doc(event.id).update(event)
     .catch(err => {
       console.log(err);
     });
   }

   async removeEvent(id: string) {
     return this.afs.doc<any>(`events/${id}`).delete()
     .catch(err => {
       console.log(err);
     });
   }
}

