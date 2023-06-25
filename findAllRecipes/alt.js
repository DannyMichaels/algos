function findAllRecipes(recipeList, requiredIngredientsList, availableSuppliesList) {
  const availableSuppliesSet = new Set(availableSuppliesList);
  const recipeSet = new Set();
  recipeList.forEach((recipe, index) => recipeSet.add([index, recipe]));
  // recipeSet: set containing tuples of recipe index and recipe
  
  let isMatchingRecipeFound = true;
  const matchingRecipes = [];
  
  // Keep searching for matching recipes until no new recipes can be found
  while(isMatchingRecipeFound) {
    isMatchingRecipeFound = false;
    // Iterate over all the recipes
    recipeSet.forEach((recipe) => {
      const [recipeIndex, recipeIngredients] = recipe;      
      // Check if all required ingredients for the recipe are available
      if (requiredIngredientsList[recipeIndex].every(ingredient => availableSuppliesSet.has(ingredient))) {
        // Add the recipe to the matching recipes list and remove its ingredients from the available supplies
        availableSuppliesSet.add(recipeIngredients);
        recipeSet.delete(recipe);
        matchingRecipes.push(recipeIngredients);
        isMatchingRecipeFound = true;
        // A new recipe has been found. the iteration needs to start over again
        // because the removal from RecipeList changes the length of RecipeList
      }
    });
  }

  return matchingRecipes;
}
  
