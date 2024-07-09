const router = require("express").Router();
const multer = require("multer");
const {
  registerUser,
  loginUser,
  updateProfile,
  deleteUser,
  getAllUsers,
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
router.delete("/delete-profile/:id", deleteUser);
router.get("/get-all-users", getAllUsers);
module.exports = router;
