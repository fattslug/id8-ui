import { UtilitiesModule } from '../utilities/utilities.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  ViewIdeasComponent,
  IdeaListComponent
} from './view-ideas';
import { IdeaFormComponent } from './idea-form/idea-form.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { SharedModule } from './shared/shared.module';
import { IdeasRoutingModule } from './ideas-routing.module';
import { InputsModule } from '../inputs/inputs.module';
import { IdeaDetailsComponent } from './view-ideas/idea-details/idea-details.component';

@NgModule({
  declarations: [
    ViewIdeasComponent,
    IdeaFormComponent,
    DeleteModalComponent,
    IdeaListComponent,
    IdeaDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IdeasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    UtilitiesModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [],
  providers: [HttpClient],
  entryComponents: [
    IdeaDetailsComponent
  ]
})
export class IdeasModule { }
