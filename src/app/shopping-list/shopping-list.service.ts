import { Ingredient } from "../shared/ingredient.model";

import { Subject } from "rxjs";

export class ShoppingListService {

    // Service Event created (Subject) which emits our Ingredient[] Array - informs our component that new data is available - ingredients have been changed
    ingredientsChanged = new Subject<Ingredient[]>();

   private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    // Get a copy of our original ingredients array defined above
    getIngredients() {
        return this.ingredients.slice();
    }   

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);

        // Execute whenever we add an ingredient to display the updated version of our ingredients[] array
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    

    addIngredients(ingredients: Ingredient[]) {
        // for(let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        
        // Javascript Spread operator to push ingredients from the recipe detail to the Shopping List using the ShoppingList service injected in the RecipeService
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
}