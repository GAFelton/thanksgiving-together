const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Whitelist for proxy port - DEV SERVER
app.use((req, res, next) => {
  const whitelist = ["localhost:3001", "localhost:3000"];
  const host = req.get("host");

  whitelist.forEach((val) => {
    if (host.indexOf(val) > -1) {
      res.setHeader("Access-Control-Allow-Origin", host);
    }
  });

  next();
});
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/thanksgivingtogetherdb", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
