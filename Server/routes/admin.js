const { Router } = require("express");
const jobsController = require("../controllers/adminControllers/jobsController");

const router = Router();

router.get("/jobs", jobsController.getAllJobs);
router.get("/jobs/:id", jobsController.getJob);

router.post("/jobs", jobsController.createJob);
router.post("/jobs/:id/retry", jobsController.retryJob);

router.put("/jobs/:id", jobsController.updateJob);

router.delete("/jobs/:id", jobsController.deleteJob);

module.exports = router;
