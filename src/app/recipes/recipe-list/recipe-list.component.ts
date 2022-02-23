import { Component, OnInit } from '@angular/core';      // Use the RecipeService instead of emitting custom event... deleted: EventEmitter, Output
import { ActivatedRoute, Router } from '@angular/router';
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

  /*  Removed this custom event as we are using the RecipeService to listen to event*/
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  // Add the RecipeService to the constructor, and use it in ngOnInit to get a copy of the recipes array (getRecipes())
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
