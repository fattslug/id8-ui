import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Id8LogoDirective } from './id8-logo.directive';

@NgModule({
  declarations: [
    Id8LogoDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Id8LogoDirective
  ]
})
export class UtilitiesModule { }
