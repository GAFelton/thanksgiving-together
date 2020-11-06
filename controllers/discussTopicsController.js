const db = require("../models");

// Defining method for the discussTopicsController
module.exports = {
  findAll(req, res) {
    db.DiscussionTopic
      .find({}, "topic")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
