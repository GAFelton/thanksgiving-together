const router = require("express").Router();
const discussTopicsController = require("../../controllers/discussTopicsController");

// Matches with "/api/discussiontopics"
router.route("/")
  .get(discussTopicsController.findAll);

module.exports = router;
