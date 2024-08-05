const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passwordUtils = require("../utils/password");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const salt = await passwordUtils.genSalt();
    const hashedPassword = await passwordUtils.hashPassword(
      data.password,
      salt
    );
    const user = await prisma.User.create({
      data: { ...data, password: hashedPassword },
    });
    console.log(user);
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
module.exports = { registerUser };
