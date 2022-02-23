import { Component, Input, OnInit } from '@angular/core';     // Use the RecipeService instead of emitting custom event... deleted: EventEmitter, Output

import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

   //Custom event for which we listen to in recipe-list.component.html    -> Removed sa we are using the RecipeService
  // @Output() recipeSelected = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
