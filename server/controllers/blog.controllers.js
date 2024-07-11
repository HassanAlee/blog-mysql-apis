const {
  addBlogQuery,
  getAllBlogsQuery,
  getSingleBlogQuery,
  getAuthorBlogsQuery,
  updateBlogQuery,
  checkBlogQuery,
  deleteBlogQuery,
} = require("../sql/blog.sql");
const mySqlPool = require("../config/db");
// add blog
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
// get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await mySqlPool.query(getAllBlogsQuery);
    res.status(200).json({ blogs: blogs[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// get single blog
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const [[blog]] = await mySqlPool.query(getSingleBlogQuery, [id]);
    res.status(200).json({ blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
// get all blogs by author
const getAuthorBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const [blogs] = await mySqlPool.query(getAuthorBlogsQuery, [id]);
    if (blogs.length == 0) {
      return res.status(200).json({ message: "No blog found" });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(200).json({ message: "Internal server error" });
  }
};
// update blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const updates = req.body;
    const allowedUpdates = ["title", "description", "image", "category"];
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
    const updatedBlog = await mySqlPool.query(updateBlogQuery(setClause), [
      ...values,
      id,
    ]);
    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const [[thisBlog]] = await mySqlPool.query(checkBlogQuery, [id]);
    if (!thisBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await mySqlPool.query(deleteBlogQuery, [id]);
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(200).json({ message: "Internal server error" });
  }
};
module.exports = {
  addBlog,
  getAllBlogs,
  getSingleBlog,
  getAuthorBlogs,
  updateBlog,
  deleteBlog,
};
