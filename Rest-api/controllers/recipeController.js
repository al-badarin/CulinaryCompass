const { userModel, recipeModel } = require("../models");

// Get all recipes
function getRecipes(req, res, next) {
  recipeModel
    .find()
    .populate("userId")
    .then((recipes) => res.json(recipes))
    .catch(next);
}

// Get a single recipe
function getRecipe(req, res, next) {
  const { recipeId } = req.params;

  recipeModel
    .findById(recipeId)
    .populate({
      path: "userId",
    })
    .then((recipe) => res.json(recipe))
    .catch(next);
}

// Get all recipes of the logged-in user
function getMyRecipes(req, res, next) {
  const userId = req.user._id;

  recipeModel
    .find({ userId })
    .then((recipes) => res.json(recipes))
    .catch(next);
}

// Create a new recipe
function createRecipe(req, res, next) {
  const { title, description, imageUrl, ingredients, instructions } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = {
    title,
    description,
    imageUrl,
    ingredients,
    instructions,
    userId,
  };

  recipeModel
    .create(newRecipe)
    .then((recipe) => {
      userModel
        .findByIdAndUpdate(
          userId,
          { $push: { recipes: recipe._id } },
          { new: true }
        )
        .then(() => {
          res
            .status(201)
            .json({ message: "Recipe created successfully", recipe });
        });
    })
    .catch(next);
}

// Update a recipe
function updateRecipe(req, res, next) {
  const { recipeId } = req.params;
  const { title, description, imageUrl, ingredients, instructions } = req.body;
  const userId = req.user._id;

  const updatedRecipe = {
    title,
    description,
    imageUrl,
    ingredients,
    instructions,
  };

  recipeModel
    .findOneAndUpdate({ _id: recipeId, userId }, updatedRecipe, { new: true })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.status(200).json({ message: "Recipe updated successfully", recipe });
    })
    .catch(next); 
}

// Delete a recipe
function deleteRecipe(req, res, next) {
  const { recipeId } = req.params;
  const userId = req.user._id;

  recipeModel
    .findOneAndDelete({ _id: recipeId, userId })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      userModel
        .findByIdAndUpdate(userId, { $pull: { recipes: recipeId } })
        .then(() => {
          res
            .status(200)
            .json({ message: "Recipe deleted successfully", recipe });
        });
    })
    .catch(next);
}

module.exports = {
  getRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getMyRecipes,
};
