const Recipe = require("../Schema/recipes");

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to retrieve recipes" });
  }
};

const createNewRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);

    // Save the new recipe
    const saved = await newRecipe.save();

    console.log(`New Saved Recepie: ${saved}`);

    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
};

const getRecipeById = async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) res.status(404).json({ message: "Recipe Not Found." });
    res.status(200).json(recipe);
  } catch (err) {
    console.log("Error Feching Recipe:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateRecipe = async (req, res) => {
    const id = req.params;
    console.log(id);
    console.log(req.body);
};

module.exports = {
  getAllRecipes,
  createNewRecipe,
  getRecipeById,
  updateRecipe,
};