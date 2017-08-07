import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

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

  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe, index: number) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
