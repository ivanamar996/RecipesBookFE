import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { IngAmount } from 'src/app/shared/IngAmount.model';
import { ShoppingList } from '../shopping-list.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit {
  
  @ViewChild('f') slForm: NgForm;
  editMode: boolean = false;
  shoppingList : ShoppingList;
  editingIngAmountIndex: number;
  id: number;

   constructor(private slService: ShoppingListService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.slService.getShoppingList(this.id).subscribe(resData=>{
          this.shoppingList = resData;
          this.slForm.setValue({name: null, amount: null});
          this.editMode = false;
        });
      }
    );
  }

  onEditItem(index:number){
    this.editMode = true;
    var ingAmount = this.shoppingList.ingAmounts[index];
    this.slForm.setValue({name: ingAmount.ingredient.name, amount: ingAmount.amount});
    this.editingIngAmountIndex = index;
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

   onDelete(){
     this.shoppingList.ingAmounts.splice(this.editingIngAmountIndex,1);
     this.slService.updateShoppingList(this.id, this.shoppingList);
     this.onClear();
   }

   onSubmit(form:NgForm){
    const value = form.value;

    if(this.editMode){
      this.shoppingList.ingAmounts[this.editingIngAmountIndex].ingredient.name = value.name;
      this.shoppingList.ingAmounts[this.editingIngAmountIndex].amount = value.amount;
      this.slService.updateShoppingList(this.id, this.shoppingList);

    }else{

      var newIngAmount = new IngAmount(0,value.amount,null,{name: value.name, id: 0}, null, this.id);
      this.shoppingList.ingAmounts.push(newIngAmount);
      this.slService.updateShoppingList(this.id, this.shoppingList);
    }

    form.reset();
    this.editMode = false;
    
  }

  onDeleteList(){
    this.slService.deleteShoppingList(this.id).subscribe(response => {
      this.router.navigateByUrl('shopping-list').then(() => {
        window.location.reload();
      }); 
    });
  }
}
