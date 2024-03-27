const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: String,
    ingredients: [String],
    instructions: [String],
    userId: {
      type: ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Recipe", recipeSchema);

// const Recipe = mongoose.model("Recipe", recipeSchema);
// module.exports = Recipe;
