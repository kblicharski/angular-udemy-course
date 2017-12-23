import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Server } from '../server';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  @ViewChild('serverContentInput') contentInput: ElementRef;

  @Output() serverCreated: EventEmitter<Server> = new EventEmitter<Server>();

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      type: 'server',
      name: nameInput.value,
      content: this.contentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      type: 'blueprint',
      name: nameInput.value,
      content: this.contentInput.nativeElement.value
    });
  }

}
