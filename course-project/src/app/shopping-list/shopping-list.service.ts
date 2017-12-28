import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  constructor() { }

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

}
