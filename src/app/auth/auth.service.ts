import { Injectable } from '@angular/core';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) { }

  public async emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      console.log(error);
    });
  }

  public async signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      this.afs.doc(`users/${userCredential.user.uid}`)
      .set({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoUrl: userCredential.user.photoURL
      });
    }).catch(error => {
      console.log(error);
    });
  }

  public async updateProfile(name: string, photoUrl: string) {
    return await this.afAuth.auth.currentUser.updateProfile({ displayName: name, photoURL: photoUrl});
  }

}
