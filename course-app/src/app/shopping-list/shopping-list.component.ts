import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { IngAmount } from '../shared/IngAmount.model';
import { ShoppingList } from './shopping-list.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {



  shoppingLists:ShoppingList[] = [];
  
  constructor(private slService: ShoppingListService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.slService.getShoppingLists().subscribe(data=>{
      this.shoppingLists = data;
    });

  }

  onNewShoppingList(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
