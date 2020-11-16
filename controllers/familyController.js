const db = require("../models");

// Family routes
module.exports = {
  // findById "GET /api/family/:id"
  findById(req, res) {
    db.Family
      .findById(req.params.id)
      .populate({
        path: "members",
        match: { archived: false },
      })
      .populate({
        path: "recipes",
        match: { archived: false },
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // findIdByCode "GET /api/family"
  findIdByCode(req, res) {
    const code = req.body.roomCode;
    db.Family.findOne({ roomCode: code }, "_id").lean()
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
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // archive "PUT /api/family/archive/:id"
  archiveFamily(req, res) {
    db.Family
      .findByIdAndUpdate(req.params.id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
