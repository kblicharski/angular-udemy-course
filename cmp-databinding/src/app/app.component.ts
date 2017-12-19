import { Component } from '@angular/core';
import { ServerService } from './server.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];

  constructor(private serverService: ServerService) {
    this.serverElements = serverService.serverElements.slice();
  }

  getServerElements() {
    this.serverElements = this.serverService.serverElements.slice();
  }

}
