import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Potatoes', 5),
    new Ingredient('Ramen', 10)
  ];

  ingredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    console.log('pushed');
    console.table(this.ingredients);
  }
}
