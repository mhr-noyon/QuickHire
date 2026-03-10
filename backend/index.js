require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const setupDatabase = require("./dbConfig/setupDB");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : [];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
app.use(cors(corsOptions));

/* ── Database setup ── */
setupDatabase().catch((err) => {
    console.error("Error setting up the database:", err);
    process.exit(1);
});

/* ── Middleware ── */
app.use(express.json());

/* ── Routes ── */
app.get("/", (_req, res) => {
    res.json({ success: true, message: "QuickHire API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

/* ── Start server ── */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
