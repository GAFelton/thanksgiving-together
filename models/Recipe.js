const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [
    {
      item: String,
      quantity: Number,
      unit: String,
    },
  ],
  prepTime: { type: Number },
  cookTime: { type: Number },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  archived: { type: Boolean, required: true, default: false },
}, { toJSON: { virtuals: true } });

recipeSchema.set("toObject", { virtuals: true });

// eslint-disable-next-line func-names
recipeSchema.virtual("totalTime".get(function () {
  return this.prepTime + this.cookTime;
}));

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
