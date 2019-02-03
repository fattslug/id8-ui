import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'id8-ui';
  isLoading = true;

  ngAfterContentInit() {
    this.isLoading = false;
  }

}
