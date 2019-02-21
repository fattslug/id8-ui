import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaFormComponent } from './idea-form/idea-form.component';
import { IdeaDetailsComponent, ViewIdeasComponent } from './view-ideas';

const routes: Routes = [
  {
    path: '',
    component: ViewIdeasComponent
  }, {
    path: 'add',
    component: IdeaFormComponent
  }, {
    path: ':ideaID',
    component: IdeaDetailsComponent
  }, {
    path: 'edit/:ideaID',
    component: IdeaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasRoutingModule { }
