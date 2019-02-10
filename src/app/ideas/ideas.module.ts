import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewIdeasComponent } from './view-ideas/view-ideas.component';
import { IdeaFormComponent } from './idea-form/idea-form.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { SharedModule } from './shared/shared.module';
import { IdeasRoutingModule } from './ideas-routing.module';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
  declarations: [ViewIdeasComponent, IdeaFormComponent, DeleteModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    IdeasRoutingModule,
    FormsModule,
    InputsModule
  ],
  exports: []
})
export class IdeasModule { }
