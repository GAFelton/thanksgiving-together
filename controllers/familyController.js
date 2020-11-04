const { Family } = require("../models");

// TODO: Set up routes
module.exports = {
  // TODO findById

  // TODO findbyRoomCode

  // TODO findAllRecipes

  // TODO findAllUsers

  // TODO create

  // TODO update

  // TODO archive
  archiveFamily(req, res) {
    // is req.params.id the correct way to get ID from React?
    const { id } = req.params.id;
    Family
      .findByIdAndUpdate(id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

};
