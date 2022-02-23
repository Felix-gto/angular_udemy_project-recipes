import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // Get id as a number which we can use to identify our recipe + fetch the recipe
    this.route.params.subscribe((params: Params) => {

      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
      
    });

  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});                     // Option 1 - simple path (recommended)
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});  // Option 2 - Construct the route more precisely (more complex - same result)
  }

}
