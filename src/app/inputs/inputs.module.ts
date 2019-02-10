import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectComponent } from './multiselect/multiselect.component';

@NgModule({
  declarations: [MultiselectComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MultiselectComponent]
})
export class InputsModule { }
