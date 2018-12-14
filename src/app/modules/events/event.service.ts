import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Event } from './event';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { reject } from 'q';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsCollection: AngularFirestoreCollection<Event>;
  events$: Observable<Event[]>;
  results: Observable<any>;
  searchForm: FormGroup;
  searchTerm: BehaviorSubject<string>;

  constructor(private afs: AngularFirestore, private fb: FormBuilder) {
    this.eventsCollection = afs.collection<Event>('events');
    this.searchForm = this.fb.group({
      search: ['', Validators.required ]
    });
    this.searchTerm = new BehaviorSubject(null);
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

   addEvent(event: Event) {
     this.eventsCollection.add(event);
   }

   updateEvent(event: Event) {
     return this.eventsCollection.doc(event.id).update(event);
   }

   removeEvent(id: string) {
     return this.afs.doc<any>(`events/${id}`).delete();
   }

   search() {
    this.results = this.searchForm.controls.search.valueChanges.pipe(
      debounceTime(500),
      filter(value => value.length > 3),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.afs.collection('events', ref => ref.where('title', '==', searchTerm)).valueChanges();
        return searchTerm;
      })
    );
  }

  searchEvent(searchTerm: string) {
    return this.afs.collection('event', ref => ref.where('title', '==', searchTerm)).valueChanges(); 
  }

}

