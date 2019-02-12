import { IdeaService } from './../idea.service';
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
  public ideaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ideaService: IdeaService
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

  private async getBusinessAreas() {
    return await this.ideaService.getBusinessAreas();
  }

  public setSelected(selected: DropdownOptions[]) {
    this.ideaForm.get('businessAreas').setValue(selected);
  }

  public onSubmit() {
    console.log(this.ideaForm.value);
    this.ideaService.addIdea(this.ideaForm.value);
  }

}
