const express = require("express");
const router = express.Router();
const {
    getAllJobs,
    getJobById,
    createJob,
} = require("../controllers/jobController");

router.get("/", async (req, res) => {
    try {
        const jobs = await getAllJobs();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const job = await getJobById(id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ error: "Job not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch job" });
    }
});

router.post("/", async (req, res) => {
    const jobData = req.body;
    try {
        const newJob = await createJob(jobData);
        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ error: "Failed to create job" });
    }
});
module.exports = router;
