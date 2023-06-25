/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
const findAllRecipes = (recipes, ingredients, supplies) => {
  // Convert supplies into a set for easier lookups
  const suppliesSet = new Set(supplies);
  
  // Result array
  const res = [];
  
  // Map recipe names to their index for easier lookup later
  const recipesMap = new Map(recipes.map((recipe, index) => [recipe, index]));
  
  // Set of recipes that can't be made
  const cantMake = new Set();
  
  
  // Recursive function to check if a recipe can be made with current supplies
  function canMake(name, visited = new Set()) {
    // Check if the recipe can be made with current supplies
    if (suppliesSet.has(name)) {
      return true;
    }
    
    // Check if the recipe doesn't exist, can't be made, or has already been visited
    if (!recipesMap.has(name) || cantMake.has(name) || visited.has(name)) {
      return false;
    }
    
    // Get the index of the recipe in the recipes array
    const idx = recipesMap.get(name);
    
    // Add the recipe to the visited set to avoid visiting it again in a cycle
    visited.add(name);
    
    // Check if all ingredients for the recipe can be made
    for (let i = 0; i < ingredients[idx].length; i++) {
      const ingredient = ingredients[idx][i];
      if (!canMake(ingredient, visited)) {
        // If an ingredient can't be made, add the recipe to the can't make set and return false
        cantMake.add(name);
        return false;
      }
    }
    
    // Mark the recipe as made by adding it to the supplies set and return true
    suppliesSet.add(name);
    return true;
  };
  // Loop over all recipes and check if each can be made with current supplies
  for (const recipe of recipes) {
    if (canMake(recipe)) {
      res.push(recipe);
    }
  }
  
  // Return the recipes that can be made
  return res;
};
};
