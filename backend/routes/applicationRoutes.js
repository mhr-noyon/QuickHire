const express = require("express");
const router = express.Router();
const { submitApplication } = require("../controllers/applicationController");

router.post("/", async (req, res) => {
    const applicationData = req.body;
    try {
        console.log("Received application data:", applicationData);
        const newApplication = await submitApplication(applicationData);
        res.status(201).json(newApplication);
    } catch (err) {
        console.error("Error in application route:", err);
        res.status(500).json({ error: "Failed to submit application" });
    }
});
module.exports = router;
