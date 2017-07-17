import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recipesClicked = true;
  shoppingListClicked = false;

  onSelection(selection: string) {
    if (selection === 'recipes') {
      this.recipesClicked = true;
      this.shoppingListClicked = false;
    } else if (selection === 'shopping-list') {
      this.recipesClicked = false;
      this.shoppingListClicked = true;
    }
  }
}
