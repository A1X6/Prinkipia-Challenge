const { Router } = require("express");;
const adminRouter = require("./admin");
const authRouter = require("./auth");
const { authenticateToken } = require("../middleware/authentication");
const { authorizeAdmin } = require("../middleware/authorization");

const router = Router();

router.get("/health-check", (req, res) => {
  res.send("Server is running");
});

router.use("/admin", authenticateToken, authorizeAdmin, adminRouter);
router.use("/auth", authRouter);


module.exports = router;
