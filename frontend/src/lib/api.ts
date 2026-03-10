import { Job } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Generic fetch wrapper that handles the { success, data } envelope.
 * Throws an error with the server message on failure.
 */
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, { cache: "no-store", ...options });
    const json = await res.json();
    console.log("API response:", json);

    // Support both wrapped { success, data } and legacy flat responses
    if (!res.ok) {
        const msg =
            json?.message || json?.error || `Request failed (${res.status})`;
        const err = new Error(msg) as Error & { errors?: string[] };
        if (json?.errors) err.errors = json.errors;
        throw err;
    }

    return json?.data !== undefined ? json.data : json;
}

/* ── Jobs ── */

export async function fetchJobs(): Promise<Job[]> {
    return apiFetch<Job[]>(`${API_BASE}/api/jobs`);
}



/*

router.get("/featured", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        console.log("Received request for featured jobs for ", limit);
        const jobs = await getFeaturedJobs(limit);
        return success(res, jobs);
    } catch (err) {
        return error(res, "Failed to fetch featured jobs");
    }
});
*/
export async function fetchFeaturedJobs({ limit = 8, featured = true }: { limit?: number; featured?: boolean } = {}): Promise<Job[]> {
    console.log("Fetching featured jobs with limit", limit);
    const url = new URL(`${API_BASE}/api/jobs/featured`);
    url.searchParams.append("limit", limit.toString());
    return apiFetch<Job[]>(url.toString());
}


// export async function fetchFeaturedJobs({ limit, featured }: { limit: number; featured: boolean }): Promise<Job[]> {
//     const url = new URL(`${API_BASE}/api/jobs/featured`);
//     url.searchParams.append("limit", limit.toString());
//     url.searchParams.append("featured", featured.toString());
//     return apiFetch<Job[]>(url.toString());
// }

export async function fetchJobById(id: string | number): Promise<Job> {
    return apiFetch<Job>(`${API_BASE}/api/jobs/${id}`);
}

export async function createJob(
    data: Omit<Job, "id" | "created_at">,
): Promise<Job> {
    return apiFetch<Job>(`${API_BASE}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export async function deleteJob(id: number): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`${API_BASE}/api/jobs/${id}`, {
        method: "DELETE",
    });
}

export async function fetchJobCountByCategory(category: string): Promise<{ category: string; count: number }> {
    return apiFetch<{ category: string; count: number }>(`${API_BASE}/api/jobs/count/${encodeURIComponent(category)}`);
}
/* ── Applications ── */

export async function submitApplication(data: {
    job_id: number;
    name: string;
    email: string;
    resume_link: string;
    cover_note: string;
}): Promise<{ id: number }> {
    return apiFetch<{ id: number }>(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}
