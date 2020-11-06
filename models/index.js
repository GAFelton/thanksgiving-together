const User = require("./User");
const Family = require("./Family");
const Recipe = require("./Recipe");
const Book = require("./book");

module.exports = {
  // Family Schema
  Family,
  // User Schema (populates Family)
  User,
  // Recipes DB Schema (populates Family)
  Recipe,
  // Legacy Book schema to prevent errors
  Book,
};
