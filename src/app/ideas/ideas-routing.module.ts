import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewIdeasComponent } from './view-ideas/view-ideas.component';
import { IdeaFormComponent } from './idea-form/idea-form.component';

const routes: Routes = [
  {
    path: '',
    component: ViewIdeasComponent
  }, {
    path: 'add',
    component: IdeaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasRoutingModule { }
