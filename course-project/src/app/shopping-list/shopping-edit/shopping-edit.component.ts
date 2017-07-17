import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  @Output() newIngredientAdded = new EventEmitter<Ingredient>();

  onAddIngredient() {
    const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;

    if (name && amount) {
      const newIngredient = new Ingredient(name, amount);
      this.newIngredientAdded.emit(newIngredient);
    }
  }

  onDeleteIngredient() {

  }

  onClearIngredient() {

  }
}
