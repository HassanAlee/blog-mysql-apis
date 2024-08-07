const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const router = express.Router();
const userControllers = require("../controllers/user.controllers.js");
router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router
  .route("/")
  .patch(verifyToken, userControllers.updateProfile)
  .delete(verifyToken, userControllers.deleteUser)
  .get(userControllers.getAllUsers);
module.exports = router;
