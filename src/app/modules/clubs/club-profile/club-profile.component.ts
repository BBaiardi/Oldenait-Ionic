import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ClubService } from '../club.service';
import { Observable } from 'rxjs';
import { Club } from '../club';
import { DbService } from '../../../services/db.service';
import { ModalController } from '@ionic/angular';
import { ClubFormComponent } from '../club-form/club-form.component';

@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.component.html',
  styleUrls: ['./club-profile.component.scss']
})
export class ClubProfileComponent implements OnInit {

  club$: Observable<Club[]>;
  clubId: string;

  constructor(private auth: AuthService,
    private db: DbService,
    public modal: ModalController) {
      this.auth.user$.subscribe(user => {
        if (user) {
          this.clubId = user.clubId;
          this.club$ = this.db.doc$(`clubs/${this.clubId}`);
        }
      });
     }

  ngOnInit() {
  }

  async presentClubForm(club?: any) {
    const modal = await this.modal.create({
      component: ClubFormComponent,
      componentProps: { club }
    });
    return await modal.present();
  }

}
