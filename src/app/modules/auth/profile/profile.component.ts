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
  AngularFireStorage
} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(public auth: AuthService, private storage: AngularFireStorage) {
    this.auth.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {}

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `users/${this.auth.afAuth.auth.currentUser.uid}/profile_pic/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
  }

  public logout() {
    this.auth.logout();
  }

}
