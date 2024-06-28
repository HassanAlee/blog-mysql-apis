const mySqlPool = require("../config/db.js");
const { registerQuery } = require("../sql/user.sql");
const { generatePassword } = require("../utils/password.js");
// register user
const registerUser = async (req, res) => {
  const { name, email, password, info = "", country = "" } = req.body;
  //   console.log(name, email);
  //   console.log(req.body);
  // console.log(req.file);
  const hashedPassword = await generatePassword(password);
  const image = "/" + req.file.path || "";
  try {
    const user = await mySqlPool.query(registerQuery, [
      name,
      email,
      hashedPassword,
      country,
      info,
      image,
    ]);
    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
module.exports = { registerUser };
