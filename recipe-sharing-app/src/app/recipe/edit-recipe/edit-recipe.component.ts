import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { firstLetterValidator } from 'src/app/shared/validators/firstLetterValidator';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  editRecipeForm: FormGroup;
  errorMessage: string = '';
  currentRecipe: Recipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.editRecipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', [Validators.required])]),
      instructions: this.fb.array([
        this.fb.control('', [Validators.required, firstLetterValidator()]),
      ]),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('recipeId');

    if (id) {
      this.recipeService.getRecipeDetails(id).subscribe(
        (recipe: Recipe) => {
          this.currentRecipe = recipe;
          this.patchFormWithRecipeData();
        },
        (error) => {
          console.error('Error fetching recipe:', error);
        }
      );
    }
  }

  patchFormWithRecipeData() {
    if (this.currentRecipe) {
      this.editRecipeForm.patchValue({
        title: this.currentRecipe.title,
        description: this.currentRecipe.description,
        image: this.currentRecipe.imageUrl,
        ingredients: this.currentRecipe.ingredients,
        instructions: this.currentRecipe.instructions,
      });
    }
  }

  get ingredients() {
    return this.editRecipeForm?.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.editRecipeForm?.get('instructions') as FormArray;
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
    if (this.editRecipeForm.valid) {
      const recipeId = this.activatedRoute.snapshot.params['recipeId'];

      const recipeData = {
        _id: recipeId,
        title: this.editRecipeForm.value.title,
        description: this.editRecipeForm.value.description,
        imageUrl: this.editRecipeForm.value.image,
        ingredients: this.editRecipeForm.value.ingredients,
        instructions: this.editRecipeForm.value.instructions,
        userId: this.editRecipeForm.value.userId,
        created_at: this.editRecipeForm.value.created_at,
        updatedAt: this.editRecipeForm.value.updatedAt,
        __v: this.editRecipeForm.value.__v,
      };

      this.recipeService.updateRecipe(recipeData).subscribe(
        (response) => {
          console.log('Recipe edited successfully:', response);
          this.editRecipeForm.reset();
          this.router.navigate(['/recipes/details', recipeId]);
        },
        (error) => {
          console.error('Error editing recipe:', error);
          this.errorMessage =
            'An error occurred during updating your recipe. Please try again.';
        }
      );
    } else {
      return;
    }
  }

  // onSubmit(): void {
  //   this.recipeService.updateRecipe(this.recipe).subscribe(
  //     (updatedRecipe) => {
  //       console.log('Recipe updated successfully:', updatedRecipe);
  //       this.router.navigate(['/recipes/details', this.recipe._id]);
  //     },
  //     (error) => {
  //       console.error('Error updating recipe:', error);
  //     }
  //   );
  // }
}
