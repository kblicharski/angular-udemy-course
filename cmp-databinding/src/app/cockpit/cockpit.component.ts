import { Component, EventEmitter, Output } from '@angular/core';
import { Server } from '../server';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  newServerContent = '';

  @Output() serverCreated: EventEmitter<Server> = new EventEmitter<Server>();

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      type: 'server',
      name: nameInput.value,
      content: this.newServerContent
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      type: 'blueprint',
      name: nameInput.value,
      content: this.newServerContent
    });
  }

}
