import { DropdownOptions } from './../../inputs/multiselect/multiselect.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.scss']
})
export class IdeaFormComponent implements OnInit {

  private selected = [];
  public label = 'Select business areas...';
  public businessAreaOptions = [
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

  public ideaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.ideaForm = this.formBuilder.group({
      title: ['', Validators.required],
      businessAreas: [[], Validators.required],
      problemDescription: ['', Validators.required],
      solutionDescription: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ideaForm.get('businessAreas').valueChanges.subscribe((result) => {
      console.log(result);
    });
  }

  public setSelected(selected: DropdownOptions[]) {
    this.ideaForm.get('businessAreas').setValue(selected);
  }

}
