const express = require("express");
const router = express.Router();
const { submitApplication } = require("../controllers/applicationController");
const { validateApplication } = require("../middleware/validate");
const { created, badRequest, error } = require("../utils/response");

/* POST /api/applications — submit application */
router.post("/", async (req, res) => {
    const { valid, errors: validationErrors } = validateApplication(req.body);
    if (!valid) return badRequest(res, "Validation failed", validationErrors);

    try {
        const newApplication = await submitApplication(req.body);
        return created(res, newApplication);
    } catch (err) {
        console.error("Error in application route:", err);
        return error(res, "Failed to submit application");
    }
});

module.exports = router;
