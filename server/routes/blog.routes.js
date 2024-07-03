const router = require("express").Router();
const multer = require("multer");
const {
  addBlog,
  getAllBlogs,
  getSingleBlog,
  getAuthorBlogs,
} = require("../controllers/blog.controllers.js");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post("/add-blog", upload.single("image"), addBlog);
router.get("/get-blogs", getAllBlogs);
router.get("/:id", getSingleBlog);
router.get("/get-author-blogs/:id", getAuthorBlogs);
module.exports = router;
