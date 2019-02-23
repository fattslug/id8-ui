import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoginModalComponent } from 'src/app/authentication/login-modal/login-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  public isNavOpen = false;
  public menuForm: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.menuForm = this.formBuilder.group({
      menuCheck: [false]
    });
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.menuForm.controls.menuCheck.setValue(false);
      }
    });
  }

  public toggleNav() {
    this.menuForm.controls.menuCheck.setValue(!this.menuForm.controls.menuCheck.value);
  }

  public openLoginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
