const db = require("../models");

// Recipes Routes.
// Always sort by archived: false.
module.exports = {
  //  findById "GET /api/v1/recipe/:id"
  findById(req, res) {
    db.Recipe
      .findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  //  search "GET /api/v1/recipe/search"
  search(req, res) {
    db.Recipe
      .find({
        src: { $regex: new RegExp(req.query.q, "i") },
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // TODO findAllByAuthor

  // create (adding recipe to correct family) "POST /api/v1/recipe/family/:(family)id"
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

  // update "PUT /api/v1/recipe/:id"
  update(req, res) {
    db.Recipe
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // archive "PUT /api/v1/recipe/archive/:id"
  archiveRecipe(req, res) {
    db.Recipe
      .findByIdAndUpdate(req.params.id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
