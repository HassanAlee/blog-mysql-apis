const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const router = express.Router();
const userControllers = require("../controllers/user.controllers.js");
const upload = require("../utils/upload.js");
router.post("/register", upload.single("image"), userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router
  .route("/")
  .patch(verifyToken, upload.single("image"), userControllers.updateProfile)
  .delete(verifyToken, userControllers.deleteUser)
  .get(userControllers.getAllUsers);
module.exports = router;
