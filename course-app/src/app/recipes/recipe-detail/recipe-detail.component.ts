import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ShoppingList } from 'src/app/shopping-list/shopping-list.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 // @Input() recipe : Recipe;
  showLists = false;
  sLists: ShoppingList[];
  recipe : Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
              private router: Router, private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.recipeService.getRecipe(this.id).subscribe(resData=>{
          this.recipe = resData as Recipe;
        });
      }
    );
  }

  onAddToShoppingList(){
    this.slService.getShoppingLists().subscribe(
      data => {
        this.showLists = true;
        this.sLists = data;
      }
    )
  }

  onPlusButtonClick(slId:number){
    this.recipeService.addIngToShoppingList(slId,this.recipe.id).subscribe(response=>{
      this.router.navigate(['/shopping-list/' + slId]);
    });
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
