import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Microwaved Potato', 'Just microwave the potato',
      'https://cdn.pixabay.com/photo/2014/09/16/18/28/potatoes-448613_960_720.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
