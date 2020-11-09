const router = require("express").Router();
const familyController = require("../../controllers/familyController");

// Matches with "/api/${version}/family"
router.route("/")
  .post(familyController.create);

// Matches with "/api/${version}/family/:id"
router.route("/:id")
  .get(familyController.findById)
  .put(familyController.update);

// Matches with "/api/${version}/family/archive/:id"
router.route("/archive/:id")
  .put(familyController.archiveFamily);

module.exports = router;
