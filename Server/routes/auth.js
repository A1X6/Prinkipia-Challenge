const { Router } = require("express");
const authControllers = require("../controllers/authController");

const router = Router();

router.post("/login", authControllers.loginUser);
router.post("/verify", authControllers.verifyToken);

module.exports = router;
