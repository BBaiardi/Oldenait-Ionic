import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../auth.service';
import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import {
  Camera
} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  image: SafeResourceUrl;

  constructor(public auth: AuthService, private sanitizer: DomSanitizer, private storage: AngularFireStorage, private camera: Camera) {}

  ngOnInit() {}

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `users/${this.auth.afAuth.auth.currentUser.uid}/profile_pic/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
  }

  /*async takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options);
  }*/

  public logout() {
    this.auth.logout();
  }

}
