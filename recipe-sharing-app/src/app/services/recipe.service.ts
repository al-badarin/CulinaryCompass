import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FirestoreRecipe } from '../models/FirestoreRecipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl =
    'https://firestore.googleapis.com/v1/projects/recipe-sharing-app-al-badarin/databases/(default)/documents/recipes';

  

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((response) => {
        const recipes: Recipe[] = response.documents.map(
          (doc: FirestoreRecipe) => {
            const data = doc.fields;
            return {
              id: doc.name.split('/').pop(),
              title: data.title.stringValue,
              description: data.description.stringValue,
              imageUrl: data.imageUrl.stringValue,
              ingredients: data.ingredients.arrayValue.values.map(
                (ingredient) => ingredient.stringValue
              ),
              instructions: data.instructions.arrayValue.values.map(
                (instruction) => instruction.stringValue
              ),
            };
          }
        );
        return recipes;
      })
    );
  }

  getRecipeDetails(recipeId: string): Observable<Recipe | undefined> {
    const url = `${this.baseUrl}/${recipeId}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const data = response.fields;
        return {
          id: response.name.split('/').pop(),
          title: data.title.stringValue,
          description: data.description.stringValue,
          imageUrl: data.imageUrl.stringValue,
          ingredients: data.ingredients.arrayValue.values.map(
            (ingredient: { stringValue: string }) => ingredient.stringValue
          ),
          instructions: data.instructions.arrayValue.values.map(
            (instruction: { stringValue: string }) => instruction.stringValue
          ),
        };
      })
    );
  }
}
