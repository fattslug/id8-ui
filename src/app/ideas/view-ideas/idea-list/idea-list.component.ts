import { IdeaService } from './../../idea.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit {

  constructor(
    private ideaService: IdeaService
  ) {
    this.ideaService.getIdeas({ startDate: new Date(), endDate: new Date() });
  }

  ngOnInit() {
  }

}
