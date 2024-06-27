const mySqlPool = require("../config/db.js");
const { registerQuery } = require("../sql/user.sql");
// register user
const registerUser = async (req, res) => {
  const { name, email, password, info = "", country = "" } = req.body;
  //   console.log(name, email);
  //   console.log(req.body);
  // console.log(req.file);
  const image = "http://localhost:3000/" + req.file.path || "";
  try {
    const user = await mySqlPool.query(registerQuery, [
      name,
      email,
      password,
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
