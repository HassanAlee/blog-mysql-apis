const {
  addBlogQuery,
  getAllBlogsQuery,
  getSingleBlogQuery,
} = require("../sql/blog.sql");
const mySqlPool = require("../config/db");
const addBlog = async (req, res) => {
  const { title, description, category, authorId } = req.body;
  const image = "/" + req.file.path || "";
  try {
    const blog = await mySqlPool.query(addBlogQuery, [
      title,
      description,
      image,
      category,
      authorId,
    ]);
    res.status(200).json({ message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add blog" });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await mySqlPool.query(getAllBlogsQuery);
    res.status(200).json({ blogs: blogs[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const [[blog]] = await mySqlPool.query(getSingleBlogQuery, [id]);
    res.status(200).json({ blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { addBlog, getAllBlogs, getSingleBlog };
