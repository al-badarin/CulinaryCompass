import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterValidator } from 'src/app/shared/validators/firstLetterValidator';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent {
  recipeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      ingredients: this.fb.array([
        this.fb.control('', [Validators.required, firstLetterValidator()]),
      ]),
      instructions: this.fb.array([
        this.fb.control('', [Validators.required, firstLetterValidator()]),
      ]),
    });
  }

  get ingredients() {
    return this.recipeForm?.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm?.get('instructions') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInstruction() {
    this.instructions.push(this.fb.control('', Validators.required));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      console.log('recipeForm value: ', this.recipeForm.value);

      const recipeData = {
        title: this.recipeForm.value.title,
        description: this.recipeForm.value.description,
        imageUrl: this.recipeForm.value.image,
        ingredients: this.recipeForm.value.ingredients,
        instructions: this.recipeForm.value.instructions,
      };

      console.log('recipeData: ', recipeData);

      this.recipeService.addRecipe(recipeData).subscribe(
        (response) => {
          console.log('Recipe added successfully:', response);
          this.recipeForm.reset();
          this.router.navigate(['/recipes/recipes-list']);
        },
        (error) => {
          console.error('Error adding recipe:', error);
          this.errorMessage =
            'An error occurred during adding a new recipe. Please try again.';
        }
      );
    } else {
      return;
    }
  }
}
