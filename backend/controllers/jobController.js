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

async function deleteJob(id) {
    try {
        await db.query("DELETE FROM jobs WHERE id = ?", [id]);
        return { message: "Job deleted successfully" };
    } catch (err) {
        console.error(`Error deleting job with id ${id}:`, err);
        throw err;
    }   
}

async function getFeaturedJobs(limit = 5) {
    try {
        console.log(`Fetching top ${limit} featured jobs`);
        const [rows] = await db.query(
            "SELECT * FROM jobs ORDER BY created_at DESC LIMIT ?",
            [limit],
        );
        return rows;
    } catch (err) {
        console.error("Error fetching top jobs:", err);
        throw err;
    }
}

async function getJobCountByCategory(category) {
    try {
        const [rows] = await db.query(
            "SELECT COUNT(*) as count FROM jobs WHERE category LIKE ?",
            [`%${category}%`],
        );
        return rows[0].count;
    } catch (err) {
        console.error(`Error fetching jobs with category ${category}:`, err);
        throw err;
    }
}

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    deleteJob,
    getJobCountByCategory,
    getFeaturedJobs,
};
