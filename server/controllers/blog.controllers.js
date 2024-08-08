const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// add blog controller
const addBlog = async (req, res) => {
  try {
    const data = req.body;
    const newBlog = await prisma.blog.create({
      data,
    });
    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    prisma.$disconnect();
  }
};
module.exports = { addBlog };
