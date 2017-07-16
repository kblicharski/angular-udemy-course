import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shoppingListClicked = false;
  recipesClicked = true;

  onRecipesClicked() {
    this.recipesClicked = true;
    this.shoppingListClicked = false;
  }

  onShoppingListClicked() {
    this.shoppingListClicked = true;
    this.recipesClicked = false;
  }
}
