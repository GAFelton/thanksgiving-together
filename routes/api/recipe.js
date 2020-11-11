const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

// Matches with "/api/${version}/recipe/:id"
router.route("/:id")
  .get(recipeController.findById)
  .put(recipeController.update);

// Matches with "/api/${version}/recipe/family/:(family)id"
router.route("/family/:id")
  .post(recipeController.create);

// Matches with "/api/${version}/recipe/archive/:id"
router.route("/archive/:id")
  .put(recipeController.archiveRecipe);

module.exports = router;
