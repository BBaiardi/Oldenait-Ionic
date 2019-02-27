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
  AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {

  public completeProfileForm: FormGroup;
  public imageUrl;
  dbRef: AngularFirestoreDocument<any>;

  constructor(public auth: AuthService,
    public afs: AngularFirestore,
    public storage: AngularFireStorage,
    private router: Router,
    private fb: FormBuilder) {
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

  async completeProfile() {
    const name = this.completeProfileForm.value['name'];
    const address = this.completeProfileForm.value['address'];
    const website = this.completeProfileForm.value['website'];
    const data = {
      name: name,
      address: address,
      website: website,
      imageUrl: this.imageUrl
    };
    this.dbRef.set(data, {
      merge: true
    });
    this.auth.showToast('!El perfil fue completado exitosamente!', 'success');
    return this.router.navigate(['/home']);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `users/${this.auth.afAuth.auth.currentUser.uid}/profile_pic/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(finalize(() => this.imageUrl = ref.getDownloadURL())).subscribe();
  }

}
