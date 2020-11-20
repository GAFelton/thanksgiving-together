const router = require("express").Router();
const auth = require("../../middleware/auth");
const familyController = require("../../controllers/familyController");

// Matches with "/api/${version}/family"
router.route("/")
  .post(familyController.create);

// Matches with "/api/${version}/family/code"
router.route("/code")
  .post(familyController.findIdByCode);

// Matches with "/api/${version}/family/:id"
router.route("/:id")
  .get(familyController.findById)
  .put(auth, familyController.update);

// Matches with "/api/${version}/family/archive/:id"
router.route("/archive/:id")
  .put(auth, familyController.archiveFamily);

module.exports = router;
