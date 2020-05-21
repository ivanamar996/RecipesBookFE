import { Output, EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IngAmount } from '../shared/IngAmount.model';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService, private http: HttpClient) { }

    getRecipes() {
        return this.recipes.slice(); //copy of recipes list
    }

    getRecipe(id: number) {
        return this.http.get<Recipe>('https://localhost:44355/api/recipes/'+ id);
    }

    addIngToShoppingList(slId:number,recepiId:number) {
        this.slService.addIngredients(slId,recepiId);
    }

    addNewRecipe(recipe:Recipe){
        this.http.post('https://localhost:44355/api/recipes', recipe)
        .subscribe(responseRecepie => {
            this.recipes.push(responseRecepie as Recipe);
            this.recipesChanged.next(this.recipes.slice());
        });
    }

    updateRecipe(id:number, newRecipe:Recipe){
        this.http.put('https://localhost:44355/api/recipes/'+ id, newRecipe)
        .subscribe(responseRecepie => {
            var index = this.recipes.findIndex(x=>x.id==id);
            this.recipes[index] = newRecipe;
            this.recipesChanged.next(this.recipes.slice());
        });

    }

    deleteRecipe(id:number){
        this.http.delete('https://localhost:44355/api/recipes/'+ id)
        .subscribe(responseRecepie => {
            var index = this.recipes.findIndex(x=>x.id == id);
            this.recipes.splice(index,1);
            this.recipesChanged.next(this.recipes.slice());
        });
    }

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}