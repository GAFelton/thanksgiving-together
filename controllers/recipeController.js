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

  // create (adding recipe to correct family) "POST /api/recipe/family/:(family)id"
  async create(req, res) {
    try {
      const newRecipe = new db.Recipe(req.body); // eslint-disable-next-line no-unused-vars
      const dbFamilyModel = await db.Family.findOneAndUpdate({ _id: req.params.id },
        { $push: { recipes: newRecipe.id } }, { new: true });
      newRecipe.save((err) => {
        if (err) throw err;
        // Should this return newRecipe, dbFamilyModel, or both? (dbFamilyModel = family document.)
        res.json(newRecipe);
      });
    } catch (error) {
      res.status(422).json(error);
    }
  },

  // update "PUT /api/recipe/:id"
  update(req, res) {
    db.Recipe
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // archive "PUT /api/recipe/archive/:id"
  archiveRecipe(req, res) {
    db.Recipe
      .findByIdAndUpdate(req.params.id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
