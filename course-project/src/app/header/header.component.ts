import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectionEvent = new EventEmitter<string>();

  onSelect(feature: string) {
    if (feature === 'recipes') {
      this.selectionEvent.emit(feature);
    } else if (feature === 'shopping-list') {
      this.selectionEvent.emit(feature);
    }
  }
}
