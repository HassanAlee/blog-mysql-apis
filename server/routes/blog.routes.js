const router = require("express").Router();
const multer = require("multer");
const {
  addBlog,
  getAllBlogs,
  getSingleBlog,
  getAuthorBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controllers.js");
const verifyToken = require("../utils/verifyToken.js");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post("/add-blog", verifyToken, upload.single("image"), addBlog);
router.get("/get-blogs", getAllBlogs);
router.get("/:id", getSingleBlog);
router.get("/get-author-blogs/:id", getAuthorBlogs);
router.patch(
  "/update-blog/:id",
  verifyToken,
  upload.single("image"),
  updateBlog
);
router.delete("/delete-blog/:id", verifyToken, deleteBlog);
module.exports = router;
