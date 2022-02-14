import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

// Import the RecipeService
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // only declare the recipes property, we will get a copy of the array using the Service
  recipes: Recipe[] = [];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  // Add the RecipeService to the constructor, and use it in ngOnInit to get a copy of the recipes array (getRecipes())
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
