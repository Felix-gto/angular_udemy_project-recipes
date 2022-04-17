import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
// import { Recipe } from '../recipe.model'; //Skipped as we skipped this step and found a better solution in the onSubmit() method

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;

  // RECIPE FORM - Add / Edit Recipe Form
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      // check if we are in editMode or not
      this.editMode = params['id'] != null;   // Returns true or false (if params has an id property -> true, if not -> false)

      // Call initForm() when the route params change -> indicates that we reloaded the page
      this.initForm();
      
      console.log(this.editMode); 
    });
    
  }

  // Submitting the Form - depending if we are in editMode or not -> we update or add a new recipe
  onSubmit() {
    // We can skip this step of saving the newRecipe in a new constant and passing it as an argument in the recipeService methods()... since our value of the Form has exactly the format of the Recipe Model and the same names
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    // Call the onCancel() method to navigate back 1 level after submitting the form
    this.onCancel();
  }

  // Add Ingredient Button - Push a new FormGRoup to the ingredients FormArray
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  // Delete Ingredient Button
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // CANCEL button - navigates us back one level without saving
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // Initialize Form -> Method responsible for initializing our Form
  private initForm() {

    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";

    // Ingredients Form Array - Initialized with a Default empty array
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // Get the recipe based on it's id from the RecipeService
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // Recipe Ingredients - check if the loaded recipe has ingredients (if they are defined)
      if(recipe['ingredients']) {

        // Loop through the ingredients and push the ingredients to the recipeIngredients Form Array (which has a .push() method   ->   push 2 new form controls to the FormArray)
        for( let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup( {
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    // RECIPE FORM
    this.recipeForm = new FormGroup( {
      // assign recipeName as default Value - same for imagePath etc.
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  // Getter -> Get the ingredients Form Array Controls
  get controls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
