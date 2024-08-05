const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers.js");
router.post("/register", userControllers.registerUser);
module.exports = router;
