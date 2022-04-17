import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

// Import the Recipe template from recipe.model
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    // Add or Update Recipe - Observable - pass the new array of Recipes as a value when we update or add a new recipe -> listen to this observable in the recipe-list component
    recipesChanged = new Subject<Recipe[]>();

    // Make the recipes: Recipe[] array private so we can't directly access it from outside. To get access, we create the getRecipes() method
    private recipes: Recipe[] = [

        new Recipe('Tasty Schnitzel',
         'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]),

        new Recipe('Big Fat Burger',
         'What else do you need to say?',
         'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
         [
             new Ingredient('Buns', 2),
             new Ingredient('Meat', 1)
         ])
    ];

    constructor(private slService: ShoppingListService) {

    }

    // Method to get access to a copy of the recipes array from outside. Without slice() we return a direct reference, with slice() we return a copy of the array
    getRecipes() {
        return this.recipes.slice();
    }

    // index = equivalent to recipe id. Gets recipe associated with it's index from the Recipe[] array
    getRecipe(index:number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    // recipeFORM - Add a new Recipe
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);

        // Emit a new copy of the recipes[] array
        this.recipesChanged.next(this.recipes.slice());
    }

    // recipeFORM - Update existing Recipe
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        
        // Emit a new copy of the recipes[] array
        this.recipesChanged.next(this.recipes.slice());
    }

    // recipeFORM - Delete Recipe
    deleteRecipe(index: number) {
       this.recipes.splice(index, 1) ;
       this.recipesChanged.next(this.recipes.slice());
    }

}