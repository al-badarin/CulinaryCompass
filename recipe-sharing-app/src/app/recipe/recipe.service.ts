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
  // Check if the current user is the owner of a recipe
  isOwnerOfRecipe(recipeUserId: string): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user) => {
        if (!user) {
          // If the user is not logged in, return false
          return false;
        }
        // Check if the current user ID matches the recipe user ID
        return user._id === recipeUserId;
      }),
      catchError((error) => {
        console.error('Error checking ownership:', error);
        return throwError(false);
      })
    );
  }

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

  // EDIT A RECIPE
  updateRecipe(recipe: Recipe) {
    return this.http.put<Recipe>(
      `/api/recipes/details/${recipe._id}/edit`,
      recipe
    );
  }

  // DELETE A RECEIPE
  removeRecipe(recipeId: string) {
    return this.http.delete(`/api/recipes/details/${recipeId}/delete`);
  }
}
