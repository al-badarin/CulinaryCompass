import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  ingredients: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.fetchRecipeDetails();
  }

  fetchRecipeDetails(): void {
    const id = this.activatedRoute.snapshot.params['recipeId'];

    if (id) {
      this.recipeService.getRecipeDetails(id).subscribe(
        (recipe) => {
          this.recipe = recipe;
        },
        (error) => {
          console.error('Error fetching recipe details:', error);
        }
      );
    }
  }
}
