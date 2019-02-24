import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../auth.service';
import {
  Router
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera/ngx';
import {
  AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/firestore';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  public completeProfileForm: FormGroup;
  public cameraImage: string = null;
  dbRef: AngularFirestoreDocument<any>;

  constructor(public auth: AuthService,
    public afs: AngularFirestore,
    private router: Router,
    private fb: FormBuilder,
    private camera: Camera) {
    this.createForm();
    this.auth.user$.subscribe(user => {
      if (user) {
        this.dbRef = this.afs.doc(`clubs/${user.uid}`);
      }
    });
  }

  ngOnInit() {}

  createForm() {
    this.completeProfileForm = this.fb.group({
      name: ['', [
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ]],
      address: ['', [
        Validators.required
      ]],
      website: ['', [
        Validators.required
      ]]
    });
  }

  getPicture(): Promise < any > {
    return new Promise(resolve => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      };
      this.camera.getPicture(options).then((imageData) => {
        this.cameraImage = 'data:image/jpeg;base64,' + imageData;
        resolve(this.cameraImage);
      }).catch(err => {
        console.log(err);
      });
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(imageData => {
      this.cameraImage = `data:image/jpeg;base64,${imageData}`;
    }).catch(err => {
      console.log(err);
    });
  }

  async completeProfile() {
    const name = this.completeProfileForm.value['name'];
    const address = this.completeProfileForm.value['address'];
    const website = this.completeProfileForm.value['website'];
    const data = {
      name: name,
      address: address,
      website: website,
      imageUrl: this.cameraImage
    };
    return this.dbRef.set(data, { merge: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }

}
