import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeEmitter = new EventEmitter<Recipe>();

  ngOnInit() {
  }

  onShowRecipeDetail() {
    console.log('detail');
    this.recipeEmitter.emit(this.recipe)
  }

}
