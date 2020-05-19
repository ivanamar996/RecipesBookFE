import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        if(this.editMode){
          this.recipeService.getRecipe(this.id).subscribe(resData=>{
            this.recipe = resData as Recipe;
            this.initForm();
          });
        }
        else
          this.initForm();
      }
    );
  }

  private initForm(){

      let recipeId = this.id ? this.id : 0;
      let recipeName = '';
      let recipeImgPath = '';
      let recipeDescription = '';
      let recipeIngAmounts = new FormArray([]);
   
      if(this.editMode){

          recipeName = this.recipe.name;
          recipeImgPath = this.recipe.imagePath;
          recipeDescription = this.recipe.description;

          if(this.recipe['ingAmounts']){
            for(let ingAmount of this.recipe.ingAmounts){
              recipeIngAmounts.push(new FormGroup({
                'id': new FormControl(ingAmount.id),
                'ingredient' : new FormGroup({
                  'name' : new FormControl(ingAmount.ingredient.name),
                  'id': new FormControl(ingAmount.ingredient.id)
                }),
                'amount': new FormControl(ingAmount.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]),
               'ingredientId': new FormControl(ingAmount.ingredientId),
               'recepieId': new FormControl(ingAmount.recepieId),
               'shoppingListId': new FormControl(ingAmount.shoppingListId)
              }))
            }
          }
      }
      
      this.recipeForm = new FormGroup({
        'id' : new FormControl(recipeId),
        'name': new FormControl(recipeName,Validators.required),
        'imagePath': new FormControl(recipeImgPath,Validators.required),
        'description': new FormControl(recipeDescription,Validators.required),
        'ingAmounts' : recipeIngAmounts
      });
  }

  onSubmit(){

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addNewRecipe(this.recipeForm.value);
    }

    this.onCancel();
   }

   onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingAmounts')).push(new FormGroup({
      'ingredient' : new FormGroup({
        'name' : new FormControl('')
      }),
      'amount': new FormControl(-1, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      'recepieId': new FormControl(this.id),
    }));
   }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingAmounts')).controls;
  }

   onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
   }

   onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingAmounts')).removeAt(index);
   }
}
