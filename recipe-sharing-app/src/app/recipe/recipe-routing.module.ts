import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
// import { AuthActivate } from '../core/guards/auth.activate';

const routes: Routes = [
  {
    path: 'recipes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecipeListComponent,
      },
      {
        path: 'recipes/:id',
        component: RecipeDetailsComponent,
      },
      //   TODO:
      // *add paths to 'recipes/:id/edit'
      // *add paths to 'recipes/:id/delete'
    ],
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    //   TODO:
    // canActivate: [AuthActivate]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
