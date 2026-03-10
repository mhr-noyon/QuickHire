const express = require("express");
const router = express.Router();
const {
    getAllJobs,
    getJobById,
    createJob,
    deleteJob,
} = require("../controllers/jobController");
const { validateJob } = require("../middleware/validate");
const {
    success,
    created,
    notFound,
    badRequest,
    error,
} = require("../utils/response");

/* GET /api/jobs — list all jobs */
router.get("/", async (req, res) => {
    try {
        const jobs = await getAllJobs();
        return success(res, jobs);
    } catch (err) {
        return error(res, "Failed to fetch jobs");
    }
});

/* GET /api/jobs/:id — single job */
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const job = await getJobById(id);
        if (!job) return notFound(res, "Job not found");
        return success(res, job);
    } catch (err) {
        return error(res, "Failed to fetch job");
    }
});

/* POST /api/jobs — create job (admin) */
router.post("/", async (req, res) => {
    const { valid, errors: validationErrors } = validateJob(req.body);
    if (!valid) return badRequest(res, "Validation failed", validationErrors);

    try {
        const newJob = await createJob(req.body);
        return created(res, newJob);
    } catch (err) {
        return error(res, "Failed to create job");
    }
});

/* DELETE /api/jobs/:id — delete job (admin) */
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteJob(id);
        return success(res, result);
    } catch (err) {
        return error(res, "Failed to delete job");
    }
});

module.exports = router;
