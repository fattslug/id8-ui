import { AuthenticationService } from './../../../authentication/authentication.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Idea } from '../../idea';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthGuardService } from 'src/app/authentication/authentication.guard';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.scss']
})
export class IdeaDetailsComponent implements OnInit {
  public iconRoot = '../../../../assets/images/icons/functional/';
  public isAuthor = false;

  constructor(
    public dialogRef: MatDialogRef<IdeaDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public idea: Idea,
    private authService: AuthenticationService
  ) {
  }

  async ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.isAuthor = await this.authService.isAuthorized(this.idea);
    }
  }

  hideModal(action?: string): void {
    this.dialogRef.close(action);
  }

}
