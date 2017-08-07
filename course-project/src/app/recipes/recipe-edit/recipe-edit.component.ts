import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from 'app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] !== undefined;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeImagePath, Validators.required),
      'imagePath': new FormControl(recipeDescription)
      // 'recipeIngredients': new FormArray([], Validators.required)
    });
  }

  // addIngredient() {
  //   const control = new FormControl(null, Validators.required);
  //   // this must be casted or else you get an error
  //   (<FormArray>this.recipeForm.get('recipeIngredients')).push(control);
  // }

  onSubmit() {
    console.log(this.recipeForm.value);
    // const value = this.recipeForm.value;
    // const name = value['name'];
    // const description = value['description'];
    // const url = value['imagePath'];
    // const ingredients = value['']
    // const recipe = new Recipe()
  }
}
