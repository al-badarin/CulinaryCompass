import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { FirestoreRecipe } from '../models/FirestoreRecipe.model';
import { AuthService } from '../user/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl =
    'https://firestore.googleapis.com/v1/projects/recipe-sharing-app-al-badarin/databases/(default)/documents/recipes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // GET ALL RECIPES
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<FirestoreRecipe>(this.baseUrl).pipe(
      map((response) => {
        if (
          !response ||
          !response.documents ||
          !Array.isArray(response.documents)
        ) {
          console.error('Invalid response format:', response);
          return [];
        }

        return response.documents.map((doc: FirestoreRecipe) => {
          const data = doc.fields;
          return {
            id: doc.name.split('/').pop() || '',
            title: data.title.stringValue || '',
            description: data.description.stringValue || '',
            imageUrl: data.imageUrl.stringValue || '',
            ingredients: (data.ingredients.arrayValue.values || []).map(
              (ingredient: { stringValue: string }) =>
                ingredient.stringValue || ''
            ),
            instructions: (data.instructions.arrayValue.values || []).map(
              (instruction: { stringValue: string }) =>
                instruction.stringValue || ''
            ),
          };
        });
      }),
      catchError((error) => {
        console.error('Error fetching recipes:', error);
        return throwError(
          'Something went wrong while fetching recipes. Please try again later.'
        );
      })
    );
  }

  // GET RECIPE'S DETAILS
  getRecipeDetails(recipeId: string): Observable<Recipe | undefined> {
    const url = `${this.baseUrl}/${recipeId}`;
    // return this.http.get<Recipe>(url);

    return this.http.get<FirestoreRecipe>(url).pipe(
      map((response) => {
        const data = response.fields;
        return {
          id: response.name.split('/').pop() || '',
          title: data.title.stringValue || '',
          description: data.description.stringValue || '',
          imageUrl: data.imageUrl.stringValue || '',
          ingredients: (data.ingredients.arrayValue.values || []).map(
            (ingredient: { stringValue: string }) =>
              ingredient.stringValue || ''
          ),
          instructions: (data.instructions.arrayValue.values || []).map(
            (instruction: { stringValue: string }) =>
              instruction.stringValue || ''
          ),
        };
      }),
      catchError((error) => {
        console.error('Error fetching recipes:', error);
        return throwError(
          'Something went wrong while fetching recipes. Please try again later.'
        );
      })
    );
  }

  // ADD A RECIPE
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http
      .post<Recipe>(this.baseUrl, {
        fields: {
          title: { stringValue: recipe.title },
          description: { stringValue: recipe.description },
          imageUrl: { stringValue: recipe.imageUrl },
          ingredients: {
            arrayValue: {
              values: recipe.ingredients.map((ingredient) => ({
                stringValue: ingredient,
              })),
            },
          },
          instructions: {
            arrayValue: {
              values: recipe.instructions.map((instruction) => ({
                stringValue: instruction,
              })),
            },
          },
        },
      })
      .pipe(
        catchError((error) => {
          console.error('Error adding recipe:', error);
          return throwError(
            'Something went wrong while adding the recipe. Please try again later.'
          );
        })
      );
  }

  // GET USER'S RECIPES BY ID
  getUserRecipesById(): Observable<Recipe[]> {
    const userId = this.authService.getUserId();

    if (!userId) {
      return throwError('User ID not found');
    }

    const url = `${this.baseUrl}?q=userId:${userId}`;

    return this.http.get<FirestoreRecipe>(url).pipe(
      map((response) => {
        if (
          !response ||
          !response.documents ||
          !Array.isArray(response.documents)
        ) {
          console.error('Invalid response format:', response);
          return [];
        }

        return response.documents.map((doc: FirestoreRecipe) => {
          const data = doc.fields;
          return {
            id: doc.name.split('/').pop() || '',
            title: data.title.stringValue || '',
            description: data.description.stringValue || '',
            imageUrl: data.imageUrl.stringValue || '',
            ingredients: (data.ingredients.arrayValue.values || []).map(
              (ingredient: { stringValue: string }) =>
                ingredient.stringValue || ''
            ),
            instructions: (data.instructions.arrayValue.values || []).map(
              (instruction: { stringValue: string }) =>
                instruction.stringValue || ''
            ),
          };
        });
      }),
      catchError((error) => {
        console.error('Error fetching user recipes:', error);
        return throwError(
          'Something went wrong while fetching user recipes. Please try again later.'
        );
      })
    );
  }
}
