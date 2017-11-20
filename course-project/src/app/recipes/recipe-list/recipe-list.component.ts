import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('potato', 'a potato', 'https://cdn.shopify.com/s/files/1/1017/2183/t/2/assets/live-preview-potato.png?17662155388061927543')
  ];

  constructor() { }

  ngOnInit() {
  }

}
