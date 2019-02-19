import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../club';
import { ClubService } from '../club.service';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {

  clubs$: Observable<Club[]>;

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.clubs$ = this.clubService.getData();
  }

}
