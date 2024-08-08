const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const blogController = require("../controllers/blog.controllers.js");
const router = express.Router();
router
  .route("/")
  .post(verifyToken, blogController.addBlog)
  .get(blogController.getAllBlogs);
router.route("/:id").get(blogController.getAuthorBlogs);
module.exports = router;
