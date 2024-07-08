const mySqlPool = require("../config/db.js");
const {
  registerQuery,
  checkUserQuery,
  updateUserQuery,
  deleteUserQuery,
} = require("../sql/user.sql");
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
    const [user] = await mySqlPool.query(checkUserQuery, [email, ""]);
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

// update profile
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const [existingUser] = await mySqlPool.query(checkUserQuery, ["", id]);
    if (existingUser.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const allowedUpdates = ["name", "email", "country", "info", "image"];
    let setClause = [],
      values = [];
    for (key in updates) {
      if (allowedUpdates.includes(key)) {
        setClause.push(`${key}=?`);
        values.push(updates[key]);
      }
    }
    if (setClause.length === 0) {
      return res.status(400).send({ message: "No valid fields to update" });
    }
    console.log(values);
    const updatedUser = await mySqlPool.query(updateUserQuery(setClause), [
      ...values,
    ]);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [[user]] = await mySqlPool.query(checkUserQuery, ["", id]);
    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }
    await mySqlPool.query(deleteUserQuery, [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser, updateProfile, deleteUser };
