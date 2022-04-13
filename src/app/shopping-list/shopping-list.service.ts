import { Ingredient } from "../shared/ingredient.model";

import { Subject } from "rxjs";

export class ShoppingListService {

    // Service Event created (Subject) which emits our Ingredient[] Array - informs our component that new data is available - ingredients have been changed
    ingredientsChanged = new Subject<Ingredient[]>();

    // Subject -> observable when we click on the ingredient to start editing -> emit a number = id(index) of the clicked ingredient
    startedEditing = new Subject<number>();

   private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    // Get a copy of our original ingredients array defined above
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);

        // Execute whenever we add an ingredient to display the updated version of our ingredients[] array
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    

    addIngredients(ingredients: Ingredient[]) {

        // Javascript Spread operator to push ingredients from the recipe detail to the Shopping List using the ShoppingList service injected in the RecipeService
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // Update Ingredient if we are in Edit Mode (see shopping-edit component)
    updateIngredient(index: number, newIngredient: Ingredient) {

        // Set the clicked ingredient to be the new submitted ingredient
        this.ingredients[index] = newIngredient;

        // Emit copy of new updated ingredients[] using the shopping list service
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // Delete Ingredient (get the index of the clicked ingredient and remove it from the ingredients[] array)
    deleteIngredient(index: number) {
        // Remove 1 element starting at the array position = index
        this.ingredients.splice(index, 1);

        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
}