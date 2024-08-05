const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await prisma.User.create({ data: data });
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
  }
};
module.exports = { registerUser };
