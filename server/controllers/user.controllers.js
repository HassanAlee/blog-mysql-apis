const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passwordUtils = require("../utils/password");
const jwt = require("jsonwebtoken");
// user registration controller
const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const existingUser = await prisma.User.findMany({
      where: {
        email: data.email,
      },
    });
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists!" });
    }
    const salt = await passwordUtils.genSalt();
    const hashedPassword = await passwordUtils.hashPassword(
      data.password,
      salt
    );
    const user = await prisma.User.create({
      data: { ...data, password: hashedPassword },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .cookie("p_token", token, {
        httpOnly: true,
        secure: false,
      })
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    prisma.$disconnect();
  }
};
// user login controller
const loginUser = async (req, res) => {
  const data = req.body;
  try {
    const existingUser = await prisma.User.findMany({
      where: {
        email: data.email,
      },
    });
    if (!existingUser.length > 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const validateUser = await passwordUtils.validatePassword(
      data.password,
      existingUser[0].password
    );
    if (!validateUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: existingUser[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .cookie("p_token", token, {
        httpOnly: true,
        secure: false,
      })
      .status(201)
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { registerUser, loginUser };
