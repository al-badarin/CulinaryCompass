const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { recipeController } = require("../controllers");

// Define routes for recipes
router.get("/", recipeController.getRecipes);
router.post("/", auth(), recipeController.createRecipe);

router.get("/:recipeId", recipeController.getRecipe);
router.put("/recipes/:recipeId", auth(), recipeController.updateRecipe);
router.delete("/recipes/:recipeId", auth(), recipeController.deleteRecipe);

module.exports = router;
