import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Id8LogoDirective } from './id8-logo.directive';
import { EllipsesPipe } from './ellipses.pipe';

@NgModule({
  declarations: [
    Id8LogoDirective,
    EllipsesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Id8LogoDirective,
    EllipsesPipe
  ]
})
export class UtilitiesModule { }
