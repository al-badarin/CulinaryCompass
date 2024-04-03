import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../models/recipe.model';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  displayedRecipes: Recipe[] = []; // Add this line

  currentPage: number = 1;
  itemsPerPage: number = 6; // Choose your desired number of items per page

  constructor(
    private recipeService: RecipeService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = this.utilsService.sortRecipesByDate(recipes);
        this.updateDisplayedRecipes(); // Update displayed recipes on init
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedRecipes();
  }
  
  private updateDisplayedRecipes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedRecipes = this.recipes.slice(startIndex, endIndex);
  }

  get totalPages(): number[] {
    const totalRecipes = this.recipes.length;
    const totalPages = Math.ceil(totalRecipes / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}