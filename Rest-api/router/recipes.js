const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { recipeController } = require("../controllers");

// Define routes for recipes
router.get("/", recipeController.getRecipes);
router.post("/", auth(), recipeController.createRecipe);

router.get("/my-recipes", auth(), recipeController.getMyRecipes);
router.get("/details/:recipeId", recipeController.getRecipe);
router.put("/details/:recipeId/edit", auth(), recipeController.updateRecipe);
router.delete("/details/:recipeId/delete", auth(), recipeController.deleteRecipe);

module.exports = router;
 