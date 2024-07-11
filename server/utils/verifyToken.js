const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const token = req?.cookies?.access_token;
  //   console.log(token);
  if (!token) {
    return res
      .status(400)
      .json({ message: "Unauthorized, please login to access service." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Unauthorized, please login to access service." });
    }
    req.userId = user.id;
    next();
  });
};
module.exports = verifyToken;
