const express = require('express');
const router = express.Router();

const  { getAllRecipes, createNewRecipe, getRecipeById, updateRecipe} = require("../Controller/recipes");


// GET all recipes
router.get('/', getAllRecipes);

// POST -> create a new recipe
router.post('/new', createNewRecipe);

// Get Recipe By Id
// router.get("/fast-food", getFastFood);

// Get Recipe By Id
router.get("/:id", getRecipeById);

router.get("/:id/update", (req, res) => {

});

router.get("/:id/delete", (req, res) => {

});


module.exports = router;