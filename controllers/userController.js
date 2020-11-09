const db = require("../models");

// TODO: Set up routes. Remember that sorting by Family can help with querying.
// Always sort by archived: false.
// Create FamilyAdmin Discriminator Key?
module.exports = {
  // TODO findById "GET /api/user/:id"
  findById(req, res) {
    db.User
      .findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // comparePassword "POST /api/user/"
  comparePassword(req, res) {
    db.User
      .findOne({ email: req.body.email }).select("password")
      .then((user) => {
        if (!user) { return res.status(400).json({ msg: "User does not exist" }); }

        user.comparePassword(req.body.password, (error, isMatch) => {
          if (error) throw error;
          if (isMatch) {
            return res.status(200).json({ msg: "Login Successful" });
          }
          return res.status(401).json({ msg: "Login Unsuccessful" });
        });
        return res.status(401).json({ msg: "Login Unsuccessful" });
      })
      .catch((err) => res.status(422).json(err));
  },
  // create (adding user to correct family) "POST /api/user/:(family)id"
  // Need to use constructor method to allow Mongoose middleware to run.
  create(req, res) {
    const newUser = new db.User(req.body);
    newUser.save((err) => {
      if (err) throw err;
    })
      .then(({ _id }) => db.Family.findOneAndUpdate({ _id: req.params.id },
        { $push: { members: _id } }, { new: true }))
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // update "PUT /api/user/:id"
  update(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // archive "PUT /api/user/archive/:id"
  archiveUser(req, res) {
    // is req.params.id the correct way to get ID from React?
    const { _id } = req.params.id;
    db.User
      .findByIdAndUpdate(_id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
