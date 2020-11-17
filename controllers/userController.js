const jwt = require("jsonwebtoken");

const db = require("../models");

// TODO: Set up routes. Remember that sorting by Family can help with querying.
// Always sort by archived: false.
// Create FamilyAdmin Discriminator Key?
// Add logout route. Add JWT validation route. Add lookup family route.
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
    const { email, password } = req.body;

    db.User
      .findOne({ email }).select("password")
      .then((user) => { // eslint-disable-line consistent-return
        if (!user) { return res.status(400).json({ msg: "User does not exist" }); }
        // eslint-disable-next-line consistent-return
        user.comparePassword(password, (error, isMatch) => {
          if (error) throw error;
          if (!isMatch) {
            return res.status(401).json({ loggedIn: false, msg: "Login Unsuccessful" });
          }
          const payload = {
            user: {
              id: user.id,
            },
          };

          jwt.sign(
            payload,
            process.env.SECRET,
            {
              algorithm: "HS512",
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
              return res.status(200).json({
                token,
              });
            },
          );
          // return res.status(200).json({ loggedIn: true, msg: "Login Successful" });
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  // create (adding user to correct family) "POST /api/user/family/:(family)id"
  // Need to use constructor method to allow Mongoose middleware to run.
  // eslint-disable-next-line consistent-return
  async create(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      family,
    } = req.body;
    try {
      const user = await db.User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }
      const newUser = new db.User({
        firstName, lastName, email, password, family,
      });
      await db.Family.findOneAndUpdate({ _id: family },
        { $push: { members: newUser.id } }, { new: true });
      await newUser.save((err) => {
        if (err) throw err;
        // Should this return newUser, dbFamilyModel, or both? (dbFamilyModel = family document.)
      });
      const payload = {
        user: {
          id: newUser.id,
        },
        iat: (Math.floor(Date.now() / 1000) - 3),
      };

      jwt.sign(
        payload,
        process.env.SECRET, {
          algorithm: "HS512",
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        },
      );
    } catch (error) {
      console.log(error);
      res.status(422).json(error);
    }
  },

  me(req, res) {
    const myID = req.user.id;
    db.User
      .findById(myID)
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
    // try {
    //   // request.user is getting fetched from Middleware after token authentication
    //   const user = await db.User.findById(req.user.id);
    //   res.json(user);
    // } catch (e) {
    //   res.send({ message: "Error in Fetching user" });
    // }
  },
  // update "PUT /api/user/:id"
  update(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // archive "PUT /api/user/archive/:id"
  archiveUser(req, res) {
    db.User
      .findByIdAndUpdate(req.params.id, { archived: true }, { new: true })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
