import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription, from } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

  //@ViewChild('nameInput',{static:false}) nameInputRef : ElementRef;
  //@ViewChild('amountInput',{static:false}) amountInputRef: ElementRef;

  @ViewChild('f') slForm: NgForm;

  subsription: Subscription;
  editItemIndex:number;
  editMode: boolean = false;
  editedIngredient: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subsription = this.slService.startedEditing.subscribe(
      (index:number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedIngredient = this.slService.getIngredient(this.editItemIndex);

        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      }
    )
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  onSubmit(form:NgForm){

    //const name = this.nameInputRef.nativeElement.value;
    //const amount = this.amountInputRef.nativeElement.value;
    const value = form.value;

    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex, newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    form.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

}
