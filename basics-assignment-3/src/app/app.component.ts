import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  detailsEnabled = false;
  buttonClicks = [];

  displayDetails() {
    this.detailsEnabled = !this.detailsEnabled;
    this.buttonClicks.push(Date.now());
    console.log(Date.now());
    console.log(this.buttonClicks.length)
  }

  getBackgroundColor() {
    return this.buttonClicks.length > 4 ? 'blue' : '';
  }
}
