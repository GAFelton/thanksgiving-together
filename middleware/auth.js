const jwt = require("jsonwebtoken");

// This auth middleware will check a users JWT against the server-side secret key.
// eslint-disable-next-line consistent-return
module.exports = function (req, res, next) {
  // token is passed in as a header.
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    if (token !== null) {
      // If the token is valid, then update req.user to pass that info forward to the next function.
      // Works with the getMe() axios call, which ends up at the "me" userController method.
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded.user;
    }
    next();
  } catch (e) {
    // If there is another problem or the token does not match, we respond with Invalid.
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
