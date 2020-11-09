const db = require("../models");

// Family routes
module.exports = {
  // findById "GET /api/family/:id"
  findById(req, res) {
    db.Family
      .findById(req.params.id)
      .populate("members")
      .populate("recipes")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // TODO findAllRecipes

  // TODO findAllUsers

  // create "POST /api/family/"
  create(req, res) {
    db.Family
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // update "PUT /api/family/:id"
  update(req, res) {
    db.Family
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // archive "PUT /api/family/archive/:id"
  archiveFamily(req, res) {
    // is req.params.id the correct way to get ID from React?
    const { _id } = req.params.id;
    db.Family
      .findByIdAndUpdate(_id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
