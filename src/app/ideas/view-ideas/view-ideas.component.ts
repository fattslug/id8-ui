import { AuthenticationService } from './../../authentication/authentication.service';
import { IdeaService } from './../idea.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from 'src/app/authentication/login-modal/login-modal.component';

@Component({
  selector: 'app-view-ideas',
  templateUrl: './view-ideas.component.html',
  styleUrls: ['./view-ideas.component.scss']
})
export class ViewIdeasComponent implements OnInit {

  constructor(
    public ideaService: IdeaService,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public getIdeas() {
    this.ideaService.getIdeas();
  }

  public openLoginModal() {
    this.authService.openLoginModal().catch((e) => {
      console.log('Error logging in:', e);
    });
  }

}
