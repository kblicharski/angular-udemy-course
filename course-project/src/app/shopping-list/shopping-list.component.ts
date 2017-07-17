import { Component, ViewChild } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Potatoes', 5),
    new Ingredient('Ramen', 10)
  ];


  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
