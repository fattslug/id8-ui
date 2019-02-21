import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaService } from './../idea.service';
import { DropdownOption } from './../../inputs/multiselect/multiselect.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessArea, Idea } from '../idea';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.scss']
})
export class IdeaFormComponent implements OnInit {

  public ideaForm: FormGroup;
  public businessAreaOptions: BusinessArea[];

  private showErrors = false;

  // Edit mode vars
  public mode = 'new';
  public idea = new Idea();

  constructor(
    private formBuilder: FormBuilder,
    private ideaService: IdeaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  async ngOnInit() {
    this.idea = await this.getIdea();
    this.ideaForm = this.formBuilder.group({
      title: [this.idea.title, Validators.required],
      businessAreas: [this.idea.businessAreas, Validators.required],
      description: [this.idea.description, Validators.required],
      icon: [this.idea.icon],
      color: [this.idea.color],
      iconObj: [{
        icon: this.idea.icon,
        color: this.idea.color
      }],
    });

    this.businessAreaOptions = await this.getBusinessAreas();
    this.ideaForm.controls.iconObj.valueChanges.subscribe((value) => {
      this.ideaForm.controls.icon.setValue(value.icon);
      this.ideaForm.controls.color.setValue(value.color);
    });
  }

  private async getIdea(): Promise<Idea> {
    let ideaID;
    await this.route.params.subscribe(async (params) => {
      if (params.ideaID) {
        this.mode = 'edit';
        ideaID = params.ideaID;
      }
    });
    if (ideaID) {
      return await this.ideaService.getIdeaByID(ideaID).then((idea: Idea) => {
        return idea;
      });
    } else {
      return new Idea();
    }
  }

  private async getBusinessAreas(): Promise<BusinessArea[]> {
    return await this.ideaService.getBusinessAreas();
  }

  public setSelected(selected: DropdownOption[]) {
    this.ideaForm.get('businessAreas').setValue(selected);
  }

  public onSubmit() {
    if (this.ideaForm.valid) {
      this.ideaService.addIdea(this.ideaForm.value).then((result) => {
        this.router.navigateByUrl('/ideas');
        this.snackBar.open('Successfully added idea', 'Dismiss', {
          duration: 2000,
        });
      });
    } else {
      this.showErrors = true;
    }
  }

  public onUpdate() {
    if (this.ideaForm.valid) {
      this.ideaService.updateIdeaByID(this.idea._id, this.ideaForm.value).then((result) => {
        this.router.navigateByUrl('/ideas');
        this.snackBar.open('Successfully edited idea', 'Dismiss', {
          duration: 2000,
        });
      });
    } else {
      this.showErrors = true;
    }
  }

  public setInitialIcon(event) {
    this.ideaForm.controls.icon.setValue(event.icon);
    this.ideaForm.controls.color.setValue(event.color);
  }

  public shouldShowError(inputName: string): boolean {
    const input = this.ideaForm.get(inputName);
    if (this.showErrors === true && input.invalid) {
      return true;
    } else {
      return false;
    }
  }

}
