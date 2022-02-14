// Import the Recipe template from recipe.model
import { Recipe } from "./recipe.model";

export class RecipeService {

    // Make the recipes: Recipe[] array private so we can't directly access it from outside. To get access, we create the getRecipes() method
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
    ];

    // Method to get access to a copy of the recipes array from outside. Without slice() we return a direct reference, with slice() we return a copy of the array
    getRecipes() {
        return this.recipes.slice();
    }

}