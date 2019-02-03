import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewIdeasComponent } from './view-ideas/view-ideas.component';
import { IdeaFormComponent } from './idea-form/idea-form.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { SharedModule } from './shared/shared.module';
import { IdeasRoutingModule } from './ideas-routing.module';

@NgModule({
  declarations: [ViewIdeasComponent, IdeaFormComponent, DeleteModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    IdeasRoutingModule
  ],
  exports: []
})
export class IdeasModule { }
