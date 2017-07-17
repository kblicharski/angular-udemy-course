import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('name') name: string;
  @ViewChild('amount') amount: number;

  @Output() newIngredientAdded = new EventEmitter<Ingredient>();

  onAddIngredient(name: string, amount: number) {
    this.newIngredientAdded.emit(new Ingredient(name, amount))
  }

  onDeleteIngredient() {

  }

  onClearIngredient() {

  }
}
