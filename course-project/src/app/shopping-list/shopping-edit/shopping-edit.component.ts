import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('f') shoppingForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  addIngredient() {
    const name = this.shoppingForm.value['name'];
    const amount = this.shoppingForm.value['amount'];
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  onSubmit() {
    console.log(this.shoppingForm);
    this.shoppingForm.reset();
  }
}
