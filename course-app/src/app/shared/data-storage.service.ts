import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService, private authService: AuthService) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put('https://my-course-46f6f.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>(
      'https://localhost:44355/api/recipes'
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingAmounts: recipe.ingAmounts ? recipe.ingAmounts: []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
       })
    );

    /* .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });*/
  }
}
