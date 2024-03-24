import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from '../auth.service';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  userRecipes: Recipe[] = [];

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (userId) {
      // Fetch user's recipes using user ID
      this.recipeService.getUserRecipesById().subscribe(
        (recipes: Recipe[]) => {
          this.userRecipes = recipes;
          console.log(this.user);
          console.log(this.userRecipes);
        },
        (error) => {
          console.error('Error fetching user recipes:', error);
        }
      );

      // Get user profile data
      this.authService.getProfile().subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }
}
