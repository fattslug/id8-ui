import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaCardComponent } from './idea-card/idea-card.component';
import { IdeasFilterComponent } from './ideas-filter/ideas-filter.component';

@NgModule({
  declarations: [IdeaCardComponent, IdeasFilterComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
