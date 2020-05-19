import { Ingredient } from './ingredient.model';

export class IngAmount{

    //public name: string;
    //public amount:number;

    constructor(public id:number, public amount:number, public ingredientId: number,public ingredient: Ingredient,public recepieId: number, public shoppingListId:number){
        //this.name = name;
        //this.amount = amount;
    }
}