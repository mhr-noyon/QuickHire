require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const setupDatabase = require("./dbConfig/setupDB");

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Database setup ── */
setupDatabase().catch((err) => {
    console.error("Error setting up the database:", err);
    process.exit(1);
});

/* ── Middleware ── */
app.use(cors());
app.use(express.json());

/* ── Routes ── */
app.get("/", (_req, res) => {
    res.json({ success: true, message: "QuickHire API is running" });
});

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

/* ── Start server ── */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
