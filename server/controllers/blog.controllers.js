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
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    const filterBlogs = blogs.map((blog) => {
      const { authorId, ...rest } = blog;
      return rest;
    });
    res.status(200).json({ blogs: filterBlogs });
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
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    const filterBlogs = blogs.map((blog) => {
      const { authorId, ...rest } = blog;
      return rest;
    });
    res.status(200).json({ blogs: filterBlogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    prisma.$disconnect();
  }
};
// get single blog
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // Exclude authorId from the response
    const { authorId, ...blogWithoutAuthorId } = blog;
    res.status(200).json({ blog: blogWithoutAuthorId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { addBlog, getAllBlogs, getAuthorBlogs, getSingleBlog };
