import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { AuthService } from '../user/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // GET ALL RECIPES
  getRecipes() {
    return this.http.get<Recipe[]>(`/api/recipes`).pipe(
      catchError((error) => {
        console.error('Error fetching recipes:', error);
        return throwError(
          'Something went wrong while fetching recipes. Please try again later.'
        );
      })
    );
  }

  // GET RECIPE'S DETAILS
  getRecipeDetails(recipeId: string) {
    return this.http.get<Recipe>(`/api/recipes/details/${recipeId}`).pipe(
      catchError((error) => {
        console.error('Error fetching recipe details:', error);
        return throwError(
          'Something went wrong while fetching recipe details. Please try again later.'
        );
      })
    );
  }

  // ADD A RECIPE
  addRecipe(recipeData: Object) {
    return this.http.post<Recipe>(`/api/recipes`, recipeData).pipe(
      catchError((error) => {
        console.error('Error adding recipe:', error);
        return throwError(
          'Something went wrong while adding the recipe. Please try again later.'
        );
      })
    );
  }

  // GET ALL USER'S RECIPES
  getMyRecipes() {
    return this.http.get<Recipe[]>(`/api/recipes/my-recipes`);
  }

  removeRecipe(recipeId: string) {
    return this.http.delete(`/api/recipes/details${recipeId}/delete`);
  }
}
