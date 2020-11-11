const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String, required: true, lowercase: true, index: { unique: true },
  },
  password: { type: String, required: true, select: false },
  familyAdmin: { type: Boolean, required: true, default: false },
  archived: { type: Boolean, required: true, default: false },
}, { toJSON: { virtuals: true } });

userSchema.set("toObject", { virtuals: true });

// eslint-disable-next-line func-names
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Example Password hashing / comparison functions from https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// eslint-disable-next-line func-names
userSchema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
    return null;
  });
  return null;
});

// This comparePassword method allows us to compare what the user enters against the
// hashed value stored in the database.
// eslint-disable-next-line func-names
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  // eslint-disable-next-line consistent-return
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
