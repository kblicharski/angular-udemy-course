import { Component, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from 'app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  onClickRecipe() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
