import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/user/auth.service';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeOwnershipGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private recipeService: RecipeService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const recipeId = route.paramMap.get('recipeId');

    if (!recipeId) {
      // Handle case where recipeId is not provided in the route
      return of(this.router.createUrlTree(['/error-404']));
    }

    return this.recipeService.getRecipeDetails(recipeId).pipe(
      switchMap((recipe: Recipe | null) => {
        if (this.authService.isLoggedIn && recipe) {
          return this.recipeService.isOwnerOfRecipe(recipe.userId._id).pipe(
            map((isOwner: boolean) => {
              if (isOwner) {
                // User is the owner of the recipe, allow access
                return true;
              } else {
                return this.router.createUrlTree(['/error-404']);
              }
            })
          );
        } else {
          return of(this.router.createUrlTree(['/error-404']));
        }
      }),
      catchError((error: any) => {
        console.error('Error fetching recipe details:', error);
        return of(this.router.createUrlTree(['/error-404']));
      })
    );
  }
}
