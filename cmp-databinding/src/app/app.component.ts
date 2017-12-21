import { Component } from '@angular/core';
import { Server } from './server';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements: Server[] = [
    {type: 'server', name: 'testserver', content: 'testcontent'}
  ];

  onServerAdded($event: Server) {
    this.serverElements.push($event);
  }

}
