import { Component, OnInit, Inject } from '@angular/core';
import { Idea } from '../../idea';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.scss']
})
export class IdeaDetailsComponent implements OnInit {
  public iconRoot = '../../../../assets/images/icons/functional/';

  constructor(
    public dialogRef: MatDialogRef<IdeaDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public idea: Idea
  ) {
  }

  ngOnInit() {}

  hideModal(action?: string): void {
    this.dialogRef.close(action);
  }

}
