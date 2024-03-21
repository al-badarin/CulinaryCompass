import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    AddRecipeComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class RecipeModule {}
