import {
  Injectable
} from '@angular/core';
import {
  auth
} from 'firebase/app';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  Observable, of
} from 'rxjs';
import {
  AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/firestore';
import {
  Router
} from '@angular/router';
import {
  Facebook} from '@ionic-native/facebook/ngx';
import {
  Platform, ToastController
} from '@ionic/angular';
import {
  GooglePlus
} from '@ionic-native/google-plus/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from '../../services/db.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  public cameraImage: string;

  constructor(public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private db: DbService,
    private router: Router,
    public facebook: Facebook,
    public gp: GooglePlus,
    private platform: Platform,
    private camera: Camera,
    public toastCtrl: ToastController) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.db.doc$(`users/${user.uid}`);
          } else {
            return of(null);
          }
        })
      );
  }

  clubId() {
    return this.user$.pipe(
      take(1),
      map(user => user && user.clubId)
    )
    .toPromise();
  }

  async emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(error => {
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        this.showToast('Contraseña incorrecta!');
      } else if (errorCode === 'auth/user-not-found') {
        this.showToast('Usuario no encontrado!');
      }  else {
        console.log(error);
      }
    });
  }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
        resolve(userCredential),
        this.afs.doc(`users/${userCredential.user.uid}`)
          .set({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            roles: {
              subscriber: true,
              admin: false
            }
          }).catch(err => {
            console.log(err);
          });
      });
    });
  }

  registerAdmin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
        resolve(userCredential),
        this.afs.doc(`users/${userCredential.user.uid}`)
          .set({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            clubId: userCredential.user.uid,
            roles: {
              subscriber: false,
              admin: true
            }
          }).catch(err => {
            console.log(err);
          });
      });
    });
  }

  async fbLogin() {
    if (this.platform.is('cordova')) {
      return await this.facebook.login(['email', 'public_profile'])
        .then(res => {
          const fbCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          this.afAuth.auth.signInAndRetrieveDataWithCredential(fbCredential)
            .then(credential => this.updateUserData(credential.user))
            .catch(err => {
              console.log(err);
            });
        });
    } else {
      return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider)
        .then(credential => this.updateUserData(credential.user))
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
        this.afAuth.auth.signInAndRetrieveDataWithCredential(googleCredential)
          .then(credential => this.updateUserData(credential.user));
      }).catch(err => {
        console.log(err);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider)
        .then(credential => this.updateUserData(credential.user))
        .catch(err => {
          console.log(err);
        });
    }
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        admin: false,
        subscriber: true
      }
    };

    return userRef.set(data, { merge: true });
  }

  async updateProfile(name: string, photoUrl: string) {
    return await this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoUrl
    });
  }

  selectImage(): Promise<any> {
    return new Promise(resolve => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(options).then((imageData) => {
        this.cameraImage = 'data:image/jpeg;base64,' + imageData;
        resolve(this.cameraImage);
      });
    });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'bottom',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  async passwordReset(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email).catch(err => console.log(err));
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
