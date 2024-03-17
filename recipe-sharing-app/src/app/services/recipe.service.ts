import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { FirestoreRecipe } from '../models/FirestoreRecipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl =
    'https://firestore.googleapis.com/v1/projects/recipe-sharing-app-al-badarin/databases/(default)/documents/recipes';

  // private recipes: Recipe[] = [
  //   {
  //     id: '1',
  //     title: 'Beef Tacos',
  //     description:
  //       'Flavorful beef tacos with seasoned ground beef and toppings',
  //     imageUrl:
  //       'https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-768x575.jpg',
  //     ingredients: [
  //       'Ground beef',
  //       'Taco seasoning',
  //       'Tortillas',
  //       'Lettuce, shredded',
  //       'Tomatoes, diced',
  //       'Cheddar cheese, grated',
  //       'Sour cream',
  //     ],
  //     instructions: [
  //       'Brown ground beef in a pan',
  //       'Add taco seasoning and water, simmer until thickened',
  //       'Heat tortillas and assemble tacos with beef, lettuce, tomatoes, cheese, and sour cream',
  //       'Enjoy hot!',
  //     ],
  //   },

  //   {
  //     id: '2',
  //     title: 'Margherita Pizza',
  //     description:
  //       'Simple and classic Italian pizza with tomato, mozzarella, and basil',
  //     imageUrl:
  //       'https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format',
  //     ingredients: [
  //       'Pizza dough',
  //       'Tomato sauce',
  //       'Fresh mozzarella cheese',
  //       'Fresh basil leaves',
  //     ],
  //     instructions: [
  //       'Roll out pizza dough',
  //       'Spread tomato sauce evenly',
  //       'Tear mozzarella cheese and distribute',
  //       'Bake in oven until crust is crispy',
  //       'Garnish with fresh basil leaves before serving',
  //     ],
  //   },

  //   {
  //     id: '3',
  //     title: 'Chicken Stir Fry',
  //     description: 'Quick and easy chicken stir fry with vegetables',
  //     imageUrl:
  //       'https://www.allrecipes.com/thmb/xvlRRhK5ldXuGcXad8XDM5tTAfE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/223382_chicken-stir-fry_Rita-1x1-1-b6b835ccfc714bb6a8391a7c47a06a84.jpg',
  //     ingredients: [
  //       'Chicken breast, sliced',
  //       'Bell peppers, sliced',
  //       'Broccoli florets',
  //       'Soy sauce',
  //       'Garlic, minced',
  //     ],
  //     instructions: [
  //       'Heat oil in a pan or wok',
  //       'Add minced garlic and stir until fragrant',
  //       'Add chicken slices and cook until browned',
  //       'Add bell peppers and broccoli, stir fry until vegetables are tender',
  //       'Season with soy sauce and serve hot',
  //     ],
  //   },

  //   {
  //     id: '4',
  //     title: 'Chocolate Chip Cookies',
  //     description: 'Classic homemade cookies with chocolate chips',
  //     imageUrl:
  //       'https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg',
  //     ingredients: [
  //       'All-purpose flour',
  //       'Butter, softened',
  //       'Brown sugar',
  //       'White sugar',
  //       'Chocolate chips',
  //     ],
  //     instructions: [
  //       'Preheat oven to 350°F (175°C)',
  //       'Cream butter and sugars until fluffy',
  //       'Mix in flour and chocolate chips',
  //       'Drop spoonfuls of dough onto baking sheet',
  //       'Bake for 10-12 minutes until golden brown',
  //     ],
  //   },

  //   {
  //     id: '5',
  //     title: 'Caesar Salad',
  //     description:
  //       'Classic Caesar salad with romaine lettuce, croutons, and Caesar dressing',
  //     imageUrl:
  //       'https://www.noracooks.com/wp-content/uploads/2022/06/vegan-caesar-salad-4.jpg',
  //     ingredients: [
  //       'Romaine lettuce, chopped',
  //       'Croutons',
  //       'Parmesan cheese, grated',
  //       'Caesar dressing',
  //     ],
  //     instructions: [
  //       'Toss chopped romaine lettuce with Caesar dressing',
  //       'Add croutons and grated Parmesan cheese',
  //       'Mix well and serve chilled',
  //     ],
  //   },
  // ];

  // getRecipes(): Recipe[] {
  //   return this.recipes;
  // }

  // getRecipesById(id: string): Recipe | undefined {
  //   return this.recipes.find((recipe) => recipe.id === id);
  // }

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


  // TODO: review code explanation
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
