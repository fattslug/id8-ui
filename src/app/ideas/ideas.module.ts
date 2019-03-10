import { AuthGuardService } from './../authentication/authentication.guard';
import { UtilitiesModule } from '../utilities/utilities.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  ViewIdeasComponent,
  IdeaListComponent,
  IdeaFilterComponent,
  IdeaDetailsComponent
} from './view-ideas';
import { IdeaFormComponent } from './idea-form/idea-form.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { IdeasRoutingModule } from './ideas-routing.module';
import { InputsModule } from '../inputs/inputs.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    ViewIdeasComponent,
    IdeaFormComponent,
    DeleteModalComponent,
    IdeaListComponent,
    IdeaDetailsComponent,
    IdeaFilterComponent
  ],
  imports: [
    CommonModule,
    IdeasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    UtilitiesModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [],
  providers: [
    HttpClient,
    AuthGuardService
  ],
  entryComponents: [
    IdeaDetailsComponent
  ]
})
export class IdeasModule { }
