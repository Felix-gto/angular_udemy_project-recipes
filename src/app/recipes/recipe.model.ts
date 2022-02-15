import { Ingredient } from "../shared/ingredient.model";

export class Recipe {

    // Property names which will be used for string interpolation, data binding etc.
    public name: string;
    public description: string;
    public imagePath: string;

    // Add the ingredients array as well in the recipe template
    public ingredients: Ingredient[];

    constructor(name:string, desc: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}