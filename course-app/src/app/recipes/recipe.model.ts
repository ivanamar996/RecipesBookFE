import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  
  constructor(name:string, decs: string,img:string, ingredients: Ingredient[]){
      this.name = name;
      this.description = decs;
      this.imagePath = img;
      this.ingredients = ingredients;
  }
}