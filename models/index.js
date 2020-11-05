const User = require("./User");
const Family = require("./Family");
const Recipe = require("./Recipe");
const DiscussionTopics = require("./DiscussionTopics");

module.exports = {
  // Family Schema
  Family,
  // User Schema (populates Family)
  User,
  // Recipes DB Schema (populates Family)
  Recipe,
  // Discussion Topics Schema
  DiscussionTopics,
};
