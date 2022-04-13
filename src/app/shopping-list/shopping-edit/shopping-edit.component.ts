import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // Get access to Form using @ViewChild
  @ViewChild('f', {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private slService: ShoppingListService ) { }

  ngOnInit() {
    // Subscribe to the shopping list service - listen for the emitted index of the clicked ingredient (startedEditing subject = observable)
    this.subscription = this.slService.startedEditing.subscribe((index: number) =>{

      // Clicked ingredient Index
      this.editedItemIndex = index;
      this.editMode = true;

      // Clicked Ingredient
      this.editedItem = this.slService.getIngredient(index);
      
      // Set Ingredient Form values with the values of the clicked ingredient
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });    
  }

  // FORM SUBMIT
  onSubmit(form: NgForm) {
    // Form value
    const value = form.value;

    // New Ingredient = get the form value: name & amount
    const newIngredient = new Ingredient(value.name, value.amount);

    //Update the ingredient if we are in editMode = true, otherwise add a new ingredient
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {

      // Not in editMode -> Use the Shopping List service to Add a New Ingredient
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  // Clear the form
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  // Delete the ingredient
  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
