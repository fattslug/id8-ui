import { Component, OnInit } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';
import { Router } from '@angular/router';

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

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

}
