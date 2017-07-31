import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from 'app/recipes/recipe-edit/recipe-edit.component';

const appRoutes = [
  { path: 'shopping',
    component: ShoppingListComponent },
  { path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: 'edit', component: RecipeEditComponent },
      { path: 'detail', component: RecipeDetailComponent }
    ]
  },
  { path: '**', redirectTo: 'recipes'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
