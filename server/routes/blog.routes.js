const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const blogController = require("../controllers/blog.controllers.js");
const router = express.Router();
router
  .route("/")
  .post(verifyToken, blogController.addBlog)
  .get(blogController.getAllBlogs);
router
  .route("/:id")
  .get(blogController.getAuthorBlogs)
  .patch(verifyToken, blogController.updateBlog)
  .delete(verifyToken, blogController.deleteBlog);
router.get("/get-blog/:id", blogController.getSingleBlog);
module.exports = router;
