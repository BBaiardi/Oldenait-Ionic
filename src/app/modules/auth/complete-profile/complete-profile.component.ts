import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  public completeProfileForm: FormGroup;
  cameraImage: string;

  constructor(public auth: AuthService,
    public afs: AngularFirestore,
    private router: Router,
    private fb: FormBuilder,
    private camera: Camera) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.completeProfileForm = this.fb.group({
      displayName: ['', [
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ]]
    });
  }

  getPicture(): Promise<any> {
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
      }).catch(err => {
        console.log(err);
      });
    });
  }

  completeProfile() {
    this.auth.user$.subscribe(user => {
      if (user) {
        const displayName = this.completeProfileForm.value['displayName'];
        return this.afs.doc(`users/${user.uid}`)
          .set({
            displayName: displayName,
            photoURL: this.cameraImage
          }, { merge: true }).then(() => {
            this.router.navigate(['/home']);
          });
      }
    });
  }

}
