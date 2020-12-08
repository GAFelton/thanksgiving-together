const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  src: { type: String },
  instructions: [
    {
      item: String,
      checked: { type: Boolean, default: false },
    },
  ],
  ingredients: [
    {
      item: String,
      quantity: Number,
      unit: String,
    },
  ],
  prepTime: { type: Number },
  cookTime: { type: Number },
  photo: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  archived: { type: Boolean, required: true, default: false },
}, { toJSON: { virtuals: true } });

recipeSchema.set("toObject", { virtuals: true });

// eslint-disable-next-line func-names
recipeSchema.virtual("totalTime").get(function () {
  return this.prepTime + this.cookTime;
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
