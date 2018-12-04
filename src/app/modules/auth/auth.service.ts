import {
  Injectable
} from '@angular/core';
import {
  User,
  auth
} from 'firebase/app';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  Observable
} from 'rxjs';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import {
  Router
} from '@angular/router';
import {
  Facebook,
  FacebookLoginResponse
} from '@ionic-native/facebook/ngx';
import {
  Platform
} from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable < User | null > ;

  constructor(public afAuth: AngularFireAuth,
     public afs: AngularFirestore,
     private router: Router,
     public facebook: Facebook,
     public gp: GooglePlus,
     private platform: Platform) {
    this.user = this.afAuth.authState;
  }

  async emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      console.log(error);
    });
  }

  async signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      this.afs.doc(`users/${userCredential.user.uid}`)
        .set({
          uid: userCredential.user.uid,
          email: userCredential.user.email
        });
    }).catch(error => {
      console.log(error);
    });
  }

  async fbLogin() {
    if (this.platform.is('cordova')) {
      return await this.facebook.login(['email', 'public_profile'])
      .then(res => {
        const credential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.afAuth.auth.signInAndRetrieveDataWithCredential(credential)
        .catch(err => {
          console.log(err);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider)
      .catch(err => {
        console.log(err);
      });
    }
  }

  async googlePlusLogin() {
    if (this.platform.is('cordova')) {
      return await this.gp.login({
        'webClientId': '289878522015-rggcbbajb9hj1vrbec3iu90qtpdfm9ul.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
        this.afAuth.auth.signInAndRetrieveDataWithCredential(googleCredential);
      }).catch(err => {
        console.log(err);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider)
      .catch(err => {
        console.log(err);
      });
    }
  }

  async updateProfile(name: string, photoUrl: string) {
    return await this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoUrl
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      return this.router.navigate(['/']);
    });
  }

}
