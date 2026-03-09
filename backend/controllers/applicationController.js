const db = require("../dbConfig/db");

async function submitApplication(applicationData) {
    const { job_id, name, email, resume_link, cover_note } = applicationData;
    try {
        const [result] = await db.query(
            "INSERT INTO applications (job_id, name, email, resume_link, cover_note) VALUES (?, ?, ?, ?, ?)",
            [job_id, name, email, resume_link, cover_note],
        );
        return { id: result.insertId, ...applicationData };
    } catch (err) {
        console.error("Error submitting application:", err);
        throw err;
    }
}

module.exports = {
    submitApplication,
};