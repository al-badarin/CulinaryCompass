import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from '../auth.service';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.getMyRecipes();
  }

  getMyRecipes() {
    this.recipeService.getMyRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
