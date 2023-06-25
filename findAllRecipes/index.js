/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
const findAllRecipes = function (recipes, ingredients, supplies) {
    // Initialize a set with the given 'supplies'
    const suppliesSet = new Set(supplies),
        // Create an empty array to store the result
        res = [],
        // Create an empty map
        recipesMap = new Map(),
        // Create an empty set
        cantMake = new Set();

    // Reverse map all recipes
    // Use a for loop to create a map of 'recipes' with their indices
    for (let i = 0; i < recipes.length; i++)
        recipesMap.set(recipes[i], i);

    // Check if we can make the given food name
    // Define a function 'canMake' which returns a boolean (true/false)
    const canMake = (name, visited = new Set()) => {
        // If 'supplies' includes the given 'name', return true (recipe not needed)
        if (suppliesSet.has(name)) return true;

        // If we cannot find 'name' in 'recipesMap' or 'cantMake' or 'visited' have 'name', return false
        if (!recipesMap.has(name) || cantMake.has(name) || visited.has(name))
            return false;

        // We can't make it using our current supplies, find its recipe
        // Get the index of the recipe from 'recipesMap'
        const idx = recipesMap.get(name);
        // Add the 'name' to the 'visited' set
        visited.add(name); // Prevent loops
        // Use a for loop to check whether we can make all the ingredients for the recipe
        for (let i = 0; i < ingredients[idx].length; i++) {
            // Get the current ingredient
            const ingredient = ingredients[idx][i];
            // If recursively we can't make an ingredient, we can't make the recipe
            if (!canMake(ingredient, visited)) {
                // Add the recipe we can't make to the 'cantMake' set
                cantMake.add(name);
                // Return false
                return false;
            }
        }
        // Add the food to our list of supplies
        suppliesSet.add(name);
        // Return true
        return true;
    };

    // Use a for loop to iterate through all the 'recipes' and checks if they can be made
    for (let i = 0; i < recipes.length; i++)
        if (canMake(recipes[i])) res.push(recipes[i]);

    // Return the result array
    return res;
};
