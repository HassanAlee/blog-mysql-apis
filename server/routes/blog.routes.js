const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const blogController = require("../controllers/blog.controllers.js");
const router = express.Router();
const upload = require("../utils/upload.js");
router
  .route("/")
  .post(verifyToken, upload.single("image"), blogController.addBlog)
  .get(blogController.getAllBlogs);
router
  .route("/:id")
  .get(blogController.getAuthorBlogs)
  .patch(verifyToken, upload.single("image"), blogController.updateBlog)
  .delete(verifyToken, blogController.deleteBlog);
router.get("/get-blog/:id", blogController.getSingleBlog);
module.exports = router;
