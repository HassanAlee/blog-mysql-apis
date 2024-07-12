const router = require("express").Router();
const multer = require("multer");
const {
  registerUser,
  loginUser,
  updateProfile,
  deleteUser,
  getAllUsers,
} = require("../controllers/user.controllers.js");
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
router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.patch(
  "/update-profile/:id",
  verifyToken,
  upload.single("image"),
  updateProfile
);
router.delete("/delete-profile/:id", verifyToken, deleteUser);
router.get("/get-all-users", getAllUsers);
module.exports = router;
