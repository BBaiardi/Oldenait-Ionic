import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Club } from './club';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private clubsCollection: AngularFirestoreCollection<Club>;
  clubs$: Observable<Club[]>;

  constructor(private afs: AngularFirestore) {
    this.clubsCollection = afs.collection<Club>('clubs');
   }

   getData(): Observable<Club[]> {
     return this.clubs$ = this.clubsCollection.snapshotChanges().pipe(
       map((actions) => {
         return actions.map((a) => {
           const data = a.payload.doc.data();
           return { id: a.payload.doc.id, ...data};
         });
       })
     );
   }

   getClub(id: string) {
     return this.afs.doc<any>(`clubs/${id}`);
   }
}
