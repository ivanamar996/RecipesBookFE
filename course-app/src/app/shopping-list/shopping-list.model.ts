import { IngAmount } from '../shared/IngAmount.model';

export class ShoppingList{
  public id:number;
  public name: string;
  public description: string;
  public ingAmounts: IngAmount[];

  constructor(id:number,name:string, decs: string, ingAmounts: IngAmount[]){
      this.id = id;
      this.name = name;
      this.description = decs;
      this.ingAmounts = ingAmounts;
  }
}