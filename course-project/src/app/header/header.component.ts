import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() recipesClickEvent = new EventEmitter<any>();
  @Output() shoppingListClickEvent = new EventEmitter<any>();

  recipesClicked() {
    console.log('recipes clicked');
    this.recipesClickEvent.emit();
  }

  shoppingListClicked() {
    console.log('shopping list clicked');
    this.shoppingListClickEvent.emit();
  }
}
