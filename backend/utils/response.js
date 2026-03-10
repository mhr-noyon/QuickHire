/**
 * Standard API response helpers for consistent formatting.
 */

function success(res, data, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        data,
    });
}

function created(res, data) {
    return success(res, data, 201);
}

function error(res, message, statusCode = 500, errors = null) {
    const body = {
        success: false,
        message,
    };
    if (errors) body.errors = errors;
    return res.status(statusCode).json(body);
}

function notFound(res, message = "Resource not found") {
    return error(res, message, 404);
}

function badRequest(res, message = "Bad request", errors = null) {
    return error(res, message, 400, errors);
}

module.exports = { success, created, error, notFound, badRequest };
