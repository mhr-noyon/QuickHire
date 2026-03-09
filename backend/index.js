const express = require("express");
const cors = require("cors");
const app = express();
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const setupDatabase = require("./dbConfig/setupDB");

const PORT = process.env.PORT || 5000;


setupDatabase().catch((err) => {
    console.error("Error setting up the database:", err);
    process.exit(1);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
