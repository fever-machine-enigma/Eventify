const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/register", authController.post_register);
router.post("/login", authController.post_login);

module.exports = router;
