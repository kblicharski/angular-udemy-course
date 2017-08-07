import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataService {

  private url = 'https://ng-recipe-book-b4fa0.firebaseio.com/recipes.json';

  constructor(private http: Http,
              private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.url, this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get(this.url);
  }

}
