import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  recipes: Recipe[] = [];
  isLoggedIn: boolean = false;
  isOwner: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        if (this.recipe) {
          this.checkIsOwner(user._id);
        }
      } else {
        this.isLoggedIn = false;
      }
    });

    this.fetchRecipeDetails();
  }

  fetchRecipeDetails(): void {
    const id = this.activatedRoute.snapshot.params['recipeId'];

    if (id) {
      this.recipeService.getRecipeDetails(id).subscribe(
        (recipe) => {
          this.recipe = recipe;
          if (this.isLoggedIn && this.recipe) {
            this.checkIsOwner(this.recipe.userId._id);
          }
        },
        (error) => {
          console.error('Error fetching recipe details:', error);
        }
      );
    }
  }

  checkIsOwner(recipeUserId: string): void {
    const user = this.authService.user;
    if (user && user._id === recipeUserId) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }
  }

  canEditRecipe(): boolean {
    return this.isLoggedIn && this.isOwner;
  }

  editRecipe(): void {
    if (this.recipe) {
      this.router.navigate(['/recipes/edit', this.recipe._id]);
    }
  }

  canDeleteRecipe(): boolean {
    return this.isLoggedIn && this.isOwner;
  }

  deleteRecipe(recipeId: string | undefined): void {
    if (recipeId) {
      this.recipeService.removeRecipe(recipeId).subscribe(
        () => {
          this.recipes = this.recipes.filter(
            (recipe) => recipe._id !== recipeId
          );
          this.router.navigate(['/recipes/recipes-list']);
        },
        (error) => {
          console.error('Deleting Recipe Error:', error);
          this.router.navigateByUrl('/auth/profile');
        }
      );
    } else {
      console.error('Recipe ID is undefined.');
    }
  }
}
