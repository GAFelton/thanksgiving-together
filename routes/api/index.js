const router = require("express").Router();
const bookRoutes = require("./books");
const discussTopicRoutes = require("./discussTopicBtn");
const recipeRoutes = require("./recipe");
const userRoutes = require("./user");
const familyRoutes = require("./family");

router.use("/books", bookRoutes);
router.use("/discussiontopics", discussTopicRoutes);
router.use("/recipe", recipeRoutes);
router.use("/user", userRoutes);
router.use("/family", familyRoutes);

module.exports = router;
