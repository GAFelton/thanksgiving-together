const router = require("express").Router();
const familyController = require("../../controllers/familyController");

// Matches with "/api/family"
router.route("/")
  .post(familyController.create);

// Matches with "/api/family/:id"
router.route("/:id")
  .get(familyController.findById)
  .put(familyController.update);

// Matches with "/api/family/archive/:id"
router.route("/archive/:id")
  .put(familyController.archiveFamily);

module.exports = router;
