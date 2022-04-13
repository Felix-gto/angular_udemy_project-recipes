import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  // Store the subscription (ShoppingListService) in a property as we subscribe to a Subject now, not to an EventEmitter
  private subscription: Subscription

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();

    // Subscribe to ShoppingListService Service ingredientsChanged Event - whenever ingredients change we will display the updated version of the ingredients[] array
    this.subscription = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });

  }

  // Emit the index of the clicked ingredient using the Shopping List Service (startedEditing = Subject (observable)) -> so we can access it in the Shopping Edit Component
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // Clean up subscription to not create a memory leak
    this.subscription.unsubscribe();
  }

}
