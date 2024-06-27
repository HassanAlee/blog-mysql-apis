const mySqlPool = require("../config/db.js");
const { registerQuery } = require("../sql/user.sql");
// register user
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    info = "",
    country = "",
    image = "",
  } = req.body;
  try {
    const user = await mySqlPool.query(registerQuery, [
      name,
      email,
      password,
      info,
      country,
      image,
    ]);
    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { registerUser };
