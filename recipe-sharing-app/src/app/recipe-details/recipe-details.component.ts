import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.getRecipeDetails();
  }

  getRecipeDetails(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeService
        .getRecipeDetails(recipeId)
        .subscribe((recipe) => (this.recipe = recipe));
    }
  }
}
