const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/${version}/user"
router.route("/")
  .post(userController.comparePassword);

// Matches with "/api/${version}/user/:id"
router.route("/:id")
  .get(userController.findById)
  .put(userController.update);

// Matches with "/api/${version}/user/family/:(family)id"
router.route("/family/:id")
  .post(userController.create);

// Matches with "/api/${version}/user/archive/:id"
router.route("/archive/:id")
  .put(userController.archiveUser);

module.exports = router;
