const { Router } = require("express");
const authController = require("../controllers/authController");
const predictController = require("../controllers/predictController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", authController.post_register);
router.post("/login", authController.post_login);
router.post("/predict", predictController.post_corpus);
router.get("/home", requireAuth);

module.exports = router;
