/**
 * Validation helpers for request body fields.
 * Each validator returns { valid, errors } where errors is an array of strings.
 */

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate job creation payload.
 */
function validateJob(body) {
    const errors = [];
    const { title, company, location, category, description } = body || {};

    if (!title || !title.trim()) errors.push("Title is required.");
    if (!company || !company.trim()) errors.push("Company is required.");
    if (!location || !location.trim()) errors.push("Location is required.");
    if (!category || !category.trim()) errors.push("Category is required.");
    if (!description || !description.trim())
        errors.push("Description is required.");

    return { valid: errors.length === 0, errors };
}

/**
 * Validate application submission payload.
 */
function validateApplication(body) {
    const errors = [];
    const { job_id, name, email, resume_link } = body || {};

    if (!job_id && job_id !== 0) errors.push("Job ID is required.");
    if (!name || !name.trim()) errors.push("Name is required.");

    if (!email || !email.trim()) {
        errors.push("Email is required.");
    } else if (!isValidEmail(email)) {
        errors.push("Email must be a valid email address.");
    }

    if (!resume_link || !resume_link.trim()) {
        errors.push("Resume link is required.");
    } else if (!isValidURL(resume_link)) {
        errors.push("Resume link must be a valid URL.");
    }

    return { valid: errors.length === 0, errors };
}

module.exports = { validateJob, validateApplication };
