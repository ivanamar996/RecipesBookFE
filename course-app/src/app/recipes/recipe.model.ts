
import { IngAmount } from '../shared/IngAmount.model';

export class Recipe{
  public id:number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingAmounts: IngAmount[];

  constructor(id:number,name:string, decs: string,img:string, ingAmounts: IngAmount[]){
      this.id = id;
      this.name = name;
      this.description = decs;
      this.imagePath = img;
      this.ingAmounts = ingAmounts;
  }
}