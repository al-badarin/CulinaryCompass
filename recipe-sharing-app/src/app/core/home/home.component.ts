import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = this.utilsService.sortRecipesByDate(recipes);
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }
}
