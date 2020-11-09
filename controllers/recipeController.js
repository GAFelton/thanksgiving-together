const db = require("../models");

// TODO: Set up routes. Remember that sorting by Family can help with querying.
// Always sort by archived: false.
module.exports = {
  // TODO findById "GET /api/recipe/:id"
  findById(req, res) {
    db.Recipe
      .findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // TODO findAllIngredients

  // TODO findAllByAuthor

  // create (adding recipe to correct family) "POST /api/recipe/:(family)id"
  create(req, res) {
    db.Recipe
      .create(req.body)
      .then(({ _id }) => db.Family.findOneAndUpdate({ _id: req.params.id },
        { $push: { recipes: _id } }, { new: true }))
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // update "PUT /api/recipe/:id"
  update(req, res) {
    db.Recipe
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // archive "PUT /api/recipe/archive/:id"
  archiveRecipe(req, res) {
    // is req.params.id the correct way to get ID from React?
    const { _id } = req.params.id;
    db.Recipe
      .findByIdAndUpdate(_id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
