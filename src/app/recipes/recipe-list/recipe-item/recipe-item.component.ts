import { Component, Input, OnInit } from '@angular/core';     // Use the RecipeService instead of emitting custom event... deleted: EventEmitter, Output

import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit(): void {
  }

}
