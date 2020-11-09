const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/${version}/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/${version}/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
