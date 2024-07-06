const router = require("express").Router();
const multer = require("multer");
const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/user.controllers.js");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.patch("/update-profile/:id", updateProfile);
module.exports = router;
