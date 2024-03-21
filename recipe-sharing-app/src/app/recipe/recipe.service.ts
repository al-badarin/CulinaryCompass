import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { FirestoreRecipe } from '../models/FirestoreRecipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl =
    'https://firestore.googleapis.com/v1/projects/recipe-sharing-app-al-badarin/databases/(default)/documents/recipes';

  constructor(private http: HttpClient) {}

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
      })
    );
  }

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
      })
    );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, {
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
    });
  }
}
