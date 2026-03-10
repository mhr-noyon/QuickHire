const express = require("express");
const router = express.Router();
const { generateAdminToken } = require("../middleware/auth");
const { success } = require("../utils/response");

/* POST /api/auth/login */
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = generateAdminToken();
        return success(res, { token });
    }

    return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
});

/* GET /api/auth/check */
router.get("/check", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (token !== generateAdminToken()) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }

    return success(res, { authenticated: true });
});

module.exports = router;
