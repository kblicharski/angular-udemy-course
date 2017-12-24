import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numComponents: number[] = [];

  addNumComponent($event: number) {
    this.numComponents.push($event);
  }

}
