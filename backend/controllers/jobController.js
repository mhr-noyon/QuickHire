const db = require("../dbConfig/db");

async function getAllJobs() {
    try {
        const [rows] = await db.query(
            "SELECT * FROM jobs ORDER BY created_at DESC",
        );
        return rows;
    } catch (err) {
        console.error("Error fetching jobs:", err);
        throw err;
    }
}

async function getJobById(id) {
    try {
        const [rows] = await db.query("SELECT * FROM jobs WHERE id = ?", [id]);
        return rows[0];
    } catch (err) {
        console.error(`Error fetching job with id ${id}:`, err);
        throw err;
    }
}

async function createJob(jobData) {
    const { title, company, location, category, description } = jobData;
    try {
        const [result] = await db.query(
            "INSERT INTO jobs (title, company, location, category, description) VALUES (?, ?, ?, ?, ?)",
            [title, company, location, category, description],
        );
        return { id: result.insertId, ...jobData };
    } catch (err) {
        console.error("Error creating job:", err);
        throw err;
    }
}

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
};
