const router = require("express").Router();
const discussTopicRoutes = require("./discussTopicBtn");
const recipeRoutes = require("./recipe");
const userRoutes = require("./user");
const familyRoutes = require("./family");

router.use("/discussiontopics", discussTopicRoutes);
router.use("/recipe", recipeRoutes);
router.use("/user", userRoutes);
router.use("/family", familyRoutes);

module.exports = router;
