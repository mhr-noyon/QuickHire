const crypto = require("crypto");

function generateAdminToken() {
    const secret = `${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`;
    return crypto
        .createHmac("sha256", secret)
        .update("admin-session")
        .digest("hex");
}

function requireAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({
                success: false,
                message: "Unauthorized — please login as admin",
            });
    }
    const token = authHeader.split(" ")[1];
    if (token !== generateAdminToken()) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized — invalid token" });
    }
    next();
}

module.exports = { requireAdmin, generateAdminToken };
