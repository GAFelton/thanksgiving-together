const router = require("express").Router();
const auth = require("../../middleware/auth");
const userController = require("../../controllers/userController");

// Matches with "/api/${version}/user"
router.route("/")
  .post(userController.comparePassword);

// Matches with "/api/${version}/user/:id"
router.route("/:id")
  .get(auth, userController.findById)
  .put(auth, userController.update);

// Matches with "/api/${version}/user/family/:(family)id"
router.route("/family/:id")
  .post(userController.create);

// Matches with "/api/${version}/user/archive/:id"
router.route("/archive/:id")
  .put(auth, userController.archiveUser);

module.exports = router;
