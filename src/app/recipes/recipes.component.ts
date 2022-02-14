import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  // Add the RecipeService to the constructor
  constructor(private recipeServices: RecipeService) {}

  ngOnInit(): void {
    // Set up the listener = subscribe to the event emitted in the RecipeService and get informed about any changes
    this.recipeServices.recipeSelected.subscribe((recipe: Recipe) => {    // Receive data (recipe) of type Recipe as configured in the EventEmitter
      this.selectedRecipe = recipe;                                       // Set the selectedRecipe property to equal the recipe we got with the Event
    });
  }
}
