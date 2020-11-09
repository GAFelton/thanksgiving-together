const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

// Matches with "/api/recipe/:id"
router.route("/:id")
  .get(recipeController.findById)
  .put(recipeController.update);

// Matches with "/api/recipe/family/:(family)id"
router.route("/family/:id")
  .post(recipeController.create);

// Matches with "/api/recipe/archive/:id"
router.route("/archive/:id")
  .put(recipeController.archiveRecipe);

module.exports = router;
