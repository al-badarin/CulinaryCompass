import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../models/recipe.model';
import { UtilsService } from 'src/app/shared/utils.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  // TODO:
  // @ViewChild(MatPaginator) paginator : MatPaginator | undefined;

  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.recipes = this.utilsService.sortRecipesByDate(recipes);
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }
}
