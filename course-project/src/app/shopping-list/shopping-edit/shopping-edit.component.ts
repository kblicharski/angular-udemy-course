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
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value,
                                      this.amountInputRef.nativeElement.value);

    this.newIngredientAdded.emit(newIngredient);
  }

  onDeleteIngredient() {

  }

  onClearIngredient() {

  }
}
