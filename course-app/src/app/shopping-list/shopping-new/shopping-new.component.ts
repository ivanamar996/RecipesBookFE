import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingList } from '../shopping-list.model';

@Component({
  selector: 'app-shopping-new',
  templateUrl: './shopping-new.component.html',
  styleUrls: ['./shopping-new.component.css']
})
export class ShoppingNewComponent implements OnInit {

  constructor(private slService: ShoppingListService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    this.slService.addNewShoppingList(new ShoppingList(0,data.value.name,data.value.description,[])).subscribe(data=>{
      window.location.reload();
    });
    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
