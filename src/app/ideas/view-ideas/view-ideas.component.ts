import { IdeaService } from './../idea.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-ideas',
  templateUrl: './view-ideas.component.html',
  styleUrls: ['./view-ideas.component.scss']
})
export class ViewIdeasComponent implements OnInit {

  constructor(
    public ideaService: IdeaService
  ) { }

  ngOnInit() {
  }

  public getIdeas() {
    this.ideaService.getIdeas();
  }

}
