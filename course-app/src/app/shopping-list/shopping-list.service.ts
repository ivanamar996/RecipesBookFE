import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { IngAmount } from '../shared/IngAmount.model';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { ShoppingList } from './shopping-list.model';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService{

    sList:ShoppingList;
    private shoppingLists : ShoppingList[] = [];

    constructor(private http: HttpClient) { }
    
    getShoppingLists(){
        return this.http.get<ShoppingList[]>(
            'https://localhost:44355/api/shoppingLists'
          ).pipe(
            map(shoppingLists => {
                console.log(shoppingLists);
              return shoppingLists.map(list => {
                return {
                  ...list,
                  ingAmounts: list.ingAmounts ? list.ingAmounts: []
                };
              });
            })
          );
    }

    getShoppingList(id: number) {
      return this.http.get<ShoppingList>('https://localhost:44355/api/shoppingLists/'+ id);
    }

    addNewShoppingList(shoppingList:ShoppingList){
      return this.http.post('https://localhost:44355/api/shoppingLists', shoppingList);
   }


    updateShoppingList(id:number,changedShoppingList: ShoppingList){
      this.http.put('https://localhost:44355/api/shoppingLists/'+ id, changedShoppingList)
      .subscribe(responseRecepie => {
          // var index = this.recipes.findIndex(x=>x.id==id);
          // this.recipes[index] = newRecipe;
          // this.recipesChanged.next(this.recipes.slice());
      });
    }
    deleteShoppingList(id:number){
      return this.http.delete('https://localhost:44355/api/shoppingLists/'+ id);
  }

  addIngredients(slId:number,recepieId:number){
    this.http.put(`https://localhost:44355/api/shoppingLists/addIngredientsToShoppingList/${slId}/recepie/${recepieId}`, null)
    .subscribe(responseRecepie => {
        // var index = this.recipes.findIndex(x=>x.id==id);
        // this.recipes[index] = newRecipe;
        // this.recipesChanged.next(this.recipes.slice());
    });
  }
}