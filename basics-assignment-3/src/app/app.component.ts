import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  detailsEnabled = false;
  buttonClicks = [];

  // Official Solution
  showSecret = false;
  log = [];

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    this.log.push(this.log.length + 1);
  }

  displayDetails() {
    this.detailsEnabled = !this.detailsEnabled;
    this.buttonClicks.push(Date.now());
  }

  getBackgroundColor(i) {
    return i > 3 ? 'blue' : '';
  }
}
