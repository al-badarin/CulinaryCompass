import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent {
  constructor(private recipeService: RecipeService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    // console.log('form values: ', form.value);

    const { title, description, image, ingredients, instructions } = form.value;

    this.recipeService
      .addRecipe(title, description, image, ingredients, instructions)
      .subscribe(
        (response) => {
          console.log('Recipe added successfully:', response);
          form.reset();
          this.router.navigate(['/recipes']);
        },
        (error) => {
          console.error('Error adding recipe:', error);
        }
      );
  }
}
