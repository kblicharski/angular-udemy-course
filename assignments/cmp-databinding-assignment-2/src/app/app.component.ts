import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numComponents = [];

  addNumComponent($event: number) {
      this.numComponents.push($event);
  }

}
