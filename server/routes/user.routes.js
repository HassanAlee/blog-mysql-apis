const router = require("express").Router();
const { registerUser } = require("../controllers/user.controllers.js");
router.post("/register", registerUser);
module.exports = router;
