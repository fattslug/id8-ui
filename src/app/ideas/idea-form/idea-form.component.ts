import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.scss']
})
export class IdeaFormComponent implements OnInit {

  private selected = [];
  public label = 'Select business areas...';
  public businessAreas = [
    {
      id: 0,
      name: 'Actuarial',
      selected: false
    }, {
      id: 1,
      name: 'Pricing',
      selected: false
    }, {
      id: 2,
      name: 'Underwriting',
      selected: false
    }, {
      id: 3,
      name: 'Claims',
      selected: false
    }, {
      id: 4,
      name: 'Vendor Management',
      selected: false
    }, {
      id: 5,
      name: 'Software Engineering',
      selected: false
    }, {
      id: 6,
      name: 'DevOps',
      selected: false
    }, {
      id: 7,
      name: 'Guidewire',
      selected: false
    }, {
      id: 8,
      name: 'Data Science',
      selected: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  public setSelected(selected) {
    console.log(selected);
  }

}
