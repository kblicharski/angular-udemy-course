import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverID = 10;
  serverStatus = '';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getTextColor() {
    return this.serverStatus === 'online' ? {'backgroundColor': 'green'} : {'backgroundColor': 'red'};
  }
}
