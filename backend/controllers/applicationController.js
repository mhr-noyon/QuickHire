const db = require("../dbConfig/db");

async function getAllApplications() {
    try {
        const [rows] = await db.query(
            `SELECT a.*, j.title AS job_title, j.company AS job_company
             FROM applications a
             LEFT JOIN jobs j ON a.job_id = j.id
             ORDER BY a.created_at DESC`,
        );
        return rows;
    } catch (err) {
        console.error("Error fetching applications:", err);
        throw err;
    }
}

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
    getAllApplications,
    submitApplication,
};
