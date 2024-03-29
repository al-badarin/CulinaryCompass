import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { AuthActivate } from '../core/guards/auth.activate';

const routes: Routes = [
  {
    path: 'recipes-list',
    component: RecipeListComponent,
  },
  {
    path: 'details/:recipeId',
    component: RecipeDetailsComponent,
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'edit/:recipeId',
    component: EditRecipeComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
