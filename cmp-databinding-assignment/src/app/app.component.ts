import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numberComponents: {'type': string, 'num': number}[] = [];

  createComponent(input: number) {
    console.log(input);
    if(input % 2 === 0) {
      this.numberComponents.push({
        type: 'even',
        num: input
      })
    } else {
      this.numberComponents.push({
        type: 'odd',
        num: input
      })
    }
  }
}
