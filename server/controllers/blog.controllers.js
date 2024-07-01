const { addBlogQuery } = require("../sql/blog.sql");
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
module.exports = { addBlog };
