const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

const version = "v1";
// API Routes
router.use(`/api/${version}`, apiRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
