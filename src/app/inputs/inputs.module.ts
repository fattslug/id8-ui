import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { IconpickerComponent } from './iconpicker/iconpicker.component';

@NgModule({
  declarations: [
    MultiselectComponent,
    IconpickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MultiselectComponent,
    IconpickerComponent
  ]
})
export class InputsModule { }
