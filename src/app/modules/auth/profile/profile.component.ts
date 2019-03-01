import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../auth.service';
import {
  AngularFireStorage
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageURL: Observable<string>;
  isAdmin;

  constructor(public auth: AuthService,
    public alertCtrl: AlertController,
    public modal: ModalController,
    private router: Router,
    private storage: AngularFireStorage) {
      this.auth.user$.subscribe(user => {
        if (user) {
          this.isAdmin = user.roles.admin;
        }
      });
  }

  ngOnInit() {}

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `users/${this.auth.afAuth.auth.currentUser.uid}/profile_pic/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(finalize(() => this.imageURL = ref.getDownloadURL())).subscribe();
  }

  async presentProfileForm(user?: any) {
    const modal = await this.modal.create({
      component: ProfileFormComponent,
      componentProps: { user }
    });
    return await modal.present();
  }

  async deleteUser() {
    const alert = await this.alertCtrl.create({
      header: 'Confirma borrar usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Aceptar',
          handler: async () => {
            await this.auth.afAuth.auth.currentUser.delete();
            this.router.navigate(['/']);
          }
        }
      ]
    });
    await alert.present();
  }

}
