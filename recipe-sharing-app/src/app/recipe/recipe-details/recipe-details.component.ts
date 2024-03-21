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
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.fetchRecipeDetails();
  }

  fetchRecipeDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeDetails(id).subscribe(
        (recipe) => {
          // TODO:!!! - DONE!
          // this.ingredients = recipe?.ingredients.split('.');
          this.recipe = recipe;
        },
        (error) => {
          console.error('Error fetching recipe details:', error);
        }
      );
    }
  }
}
