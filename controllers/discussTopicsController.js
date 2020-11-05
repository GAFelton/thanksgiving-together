const { DiscussionTopic } = require("../models");

// Defining method for the discussTopicsController
module.exports = {
  findAll(req, res) {
    DiscussionTopic
      .find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
