import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Ingredient } from 'app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.shoppingListService.ingredientAdded.subscribe(
      (ingredient: Ingredient) => {
        this.shoppingListService.addIngredient(ingredient);
        this.ingredients = this.shoppingListService.getIngredients();
      }
    );
  }
}
