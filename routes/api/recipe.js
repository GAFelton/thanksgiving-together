const router = require("express").Router();
const auth = require("../../middleware/auth");
const recipeController = require("../../controllers/recipeController");

// Matches with "/api/${version}/recipe/search"
router.route("/search")
  .get(auth, recipeController.search);

// Matches with "/api/${version}/recipe/:id"
router.route("/:id")
  .get(auth, recipeController.findById)
  .put(auth, recipeController.update);

// Matches with "/api/${version}/recipe/family/:(family)id"
router.route("/family/:id")
  .post(auth, recipeController.create);

// Matches with "/api/${version}/recipe/archive/:id"
router.route("/archive/:id")
  .put(auth, recipeController.archiveRecipe);

module.exports = router;
