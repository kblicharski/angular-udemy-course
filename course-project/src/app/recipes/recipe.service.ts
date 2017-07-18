import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Microwaved Potato', 'Just microwave the potato',
               'http://www.dullmensclub.com/wp-content/uploads/Potato-3.jpg'),
    new Recipe('Ramen', 'Boil water and put it in',
               'http://steamykitchen.com/wp-content/uploads/2011/04/miso-ramen-recipe-20971.jpg')
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
