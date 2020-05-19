import { Component, OnInit, Input } from '@angular/core';
import { ShoppingList } from '../shopping-list.model';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})

export class ShoppingItemComponent implements OnInit {

  @Input() shoppingList: ShoppingList;
  @Input() id: number
  
  constructor() { }

  ngOnInit(): void {
  }

}
