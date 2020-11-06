const User = require("./User");
const Family = require("./Family");
const Recipe = require("./Recipe");
const DiscussionTopic = require("./DiscussionTopic");
const Book = require("./book");

module.exports = {
  // Family Schema
  Family,
  // User Schema (populates Family)
  User,
  // Recipes DB Schema (populates Family)
  Recipe,
  // Discussion Topics Schema
  DiscussionTopic,
  // Legacy Book schema to prevent errors
  Book,
};
