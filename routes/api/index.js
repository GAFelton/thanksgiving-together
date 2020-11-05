const router = require("express").Router();
const bookRoutes = require("./books");
const discussTopicRoutes = require("./discussTopicBtn");

// Book routes
router.use("/books", bookRoutes);
router.use("/discussiontopics", discussTopicRoutes);

module.exports = router;
