const User = require("./User");
const Family = require("./Family");
const Recipe = require("./Recipe");

module.exports = {
  // Family Schema
  Family,
  // User Schema (populates Family)
  User,
  // Recipes DB Schema (populates Family)
  Recipe,

};
