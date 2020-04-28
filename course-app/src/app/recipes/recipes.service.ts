import { Output, EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    /*private recipes: Recipe[] = [
        new Recipe('A test recipe',
            'This is a test',
            'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1024/hellofresh_s3/image/5dcc139c96d0db43857c2eb3-a12c2ae7.jpg',
            [
                new Ingredient('Bread', 1),
                new Ingredient('Meat', 1)
            ]),
        new Recipe('Another test recipe',
            'This is a test',
            'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1024/hellofresh_s3/image/5dcc139c96d0db43857c2eb3-a12c2ae7.jpg',
            [
                new Ingredient('Eggs', 5),
                new Ingredient('Milk', 1)
            ])
    ];*/

    //@Output() recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice(); //copy of recipes list
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addNewRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}