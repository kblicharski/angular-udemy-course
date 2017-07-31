import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from 'app/shared/models/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Microwaved Potato', 'Microwave the potato.',
               'http://www.dullmensclub.com/wp-content/uploads/Potato-3.jpg',
                [new Ingredient('Potato', 1)]),
    new Recipe('Ramen', 'Boil water. Put in noodles. Put in eggs.',
               'http://steamykitchen.com/wp-content/uploads/2011/04/miso-ramen-recipe-20971.jpg',
                [new Ingredient('Noodles', 1), new Ingredient('Eggs', 2)])
  ];

  recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
