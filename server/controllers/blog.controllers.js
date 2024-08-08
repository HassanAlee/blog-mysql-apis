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
// get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    prisma.$disconnect();
  }
};
// get all blogs of a author
const getAuthorBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: Number(id),
      },
    });
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    prisma.$disconnect();
  }
};
module.exports = { addBlog, getAllBlogs, getAuthorBlogs };
