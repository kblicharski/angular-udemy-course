import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeChanged: EventEmitter<Recipe[]> = new EventEmitter<Recipe[]>();
  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor() { }

  private _recipes: Recipe[] = [
    new Recipe(
      'potato',
      'a potato',
      'https://cdn.shopify.com/s/files/1/1017/2183/t/2/assets/live-preview-potato.png?17662155388061927543',
      [new Ingredient('Potato', 1)]
    ),
    new Recipe(
      'potato 2',
      'another potato!',
      'https://cdn.shopify.com/s/files/1/1017/2183/t/2/assets/live-preview-potato.png?17662155388061927543',
      [new Ingredient('Potato', 1)]
    )
  ];

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

}
