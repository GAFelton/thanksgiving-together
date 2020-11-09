const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
  .post(userController.comparePassword);

// Matches with "/api/user/:id"
router.route("/:id")
  .get(userController.findById)
  .put(userController.update);

// Matches with "/api/user/family/:(family)id"
router.route("/family/:id")
  .post(userController.create);

// Matches with "/api/user/archive/:id"
router.route("/archive/:id")
  .put(userController.archiveUser);

module.exports = router;
