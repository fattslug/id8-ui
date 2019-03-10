import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './../authentication/authentication.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthenticationModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class NavigationModule { }
