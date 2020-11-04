const { User } = require("../models");

// TODO: Set up routes. Remember that sorting by Family can help with querying.
// Always sort by archived: false.
module.exports = {
  // TODO findById

  // TODO comparePassword

  // TODO create (When creating, remember to add the user _id to the correct family document.)

  // TODO update

  // TODO archive
  archiveUser(req, res) {
    // is req.params.id the correct way to get ID from React?
    const { id } = req.params.id;
    User
      .findByIdAndUpdate(id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
