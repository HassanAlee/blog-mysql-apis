const mySqlPool = require("../config/db.js");
const { registerQuery, checkUserQuery } = require("../sql/user.sql");
const { generatePassword, checkPassword } = require("../utils/password.js");
const jwt = require("jsonwebtoken");
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

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await mySqlPool.query(checkUserQuery, [email]);
    if (user.length == 0) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    const validatePassword = await checkPassword(user[0].password, password);
    if (!validatePassword) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ message: "Signin successful", user: user[0] });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
module.exports = { registerUser, loginUser };
