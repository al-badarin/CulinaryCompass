import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from '../auth.service';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { Profile } from 'src/app/models/profile';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  recipes: Recipe[] = [];
  profileDetails: Profile | undefined;
  isEditMode: boolean = false;
  errorMessage: string = '';
  hasError: boolean = false;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
  });

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Setting USER'S FIELDS
    const { username, email } = this.authService.user!;
    this.profileDetails = { username, email };
    this.form.setValue({ username, email });

    // Getting USER'S RECIPES
    this.getMyRecipes();
  }

  getMyRecipes() {
    this.recipeService.getMyRecipes().subscribe((recipes) => {
      this.recipes = this.utilsService.sortRecipesByDate(recipes);
    });
  }

  toggleEditMode(): void {
    console.log('toggling edit mode func called');
    
    if (!this.hasError) {
      this.isEditMode = !this.isEditMode;
    }
  }

  saveProfileHandle(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.hasError = true;
      return;
    }

    this.profileDetails = { ...this.form.value } as Profile;
    const { username, email } = this.profileDetails;

    this.authService.updateProfile(username!, email!).subscribe(
      (response) => {
        console.log('Profile changes made successfully!', response);
        // this.toggleEditMode();
        this.hasError = false;
        this.profileDetails = { username, email };
        this.isEditMode = false;
      },
      (error) => {
        this.hasError = true;
        console.error('Profile edit error:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage =
            'An error occurred during editing profile details. Please try again.';
        }
      }
    );
  }

  onCancel(e: Event): void {
    e.preventDefault();
    if (!this.hasError) {
      this.toggleEditMode();
    }
  }

  onDeleteRecipe(recipeId: string): void {
    this.recipeService.removeRecipe(recipeId).subscribe(
      () => {
        this.recipes = this.recipes.filter((recipe) => recipe._id !== recipeId);
        this.router.navigate(['/auth/profile']);
      },
      (error) => {
        console.error('Deleting Recipe Error:', error);
        this.router.navigateByUrl('/auth/profile');
      }
    );
  }
}
