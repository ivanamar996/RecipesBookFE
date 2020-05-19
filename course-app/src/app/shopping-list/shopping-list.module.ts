import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { ShoppingStartComponent } from './shopping-start/shopping-start.component';
import { ShoppingNewComponent } from './shopping-new/shopping-new.component';

const routes: Routes = [
  {path: '', component: ShoppingStartComponent, 
  children: [
    {path:'new', component: ShoppingNewComponent},
    {path:':id', component: ShoppingEditComponent},
  ]},
]

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent, ShoppingItemComponent, ShoppingStartComponent, ShoppingNewComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ShoppingListModule {}
