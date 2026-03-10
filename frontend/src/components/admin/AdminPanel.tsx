"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
    Trash2,
    Plus,
    Loader2,
    Search,
    ExternalLink,
    Briefcase,
    MapPin,
    CheckCircle2,
} from "lucide-react";
import { fetchJobs, createJob, deleteJob } from "@/lib/api";
import { Job } from "@/lib/types";

const emptyForm = {
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
};

const categories = [
    "Design",
    "Sales",
    "Marketing",
    "Finance",
    "Technology",
    "Engineering",
    "Business",
    "Human Resource",
];

export default function AdminPanel() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    /* Load jobs */
    function loadJobs() {
        setLoading(true);
        fetchJobs()
            .then(setJobs)
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        loadJobs();
    }, []);

    /* Filter jobs in admin list */
    const filteredJobs = useMemo(() => {
        if (!searchQuery.trim()) return jobs;
        const q = searchQuery.toLowerCase();
        return jobs.filter(
            (job) =>
                job.title.toLowerCase().includes(q) ||
                job.company.toLowerCase().includes(q) ||
                job.category.toLowerCase().includes(q) ||
                job.location.toLowerCase().includes(q),
        );
    }, [jobs, searchQuery]);

    /* Handle form */
    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (formError) setFormError("");
        if (formSuccess) setFormSuccess("");
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setFormError("");
        setFormSuccess("");

        if (
            !form.title.trim() ||
            !form.company.trim() ||
            !form.location.trim() ||
            !form.category.trim() ||
            !form.description.trim()
        ) {
            setFormError("All fields are required.");
            return;
        }

        setSubmitting(true);
        try {
            await createJob(form);
            setForm(emptyForm);
            setFormSuccess("Job posted successfully!");
            loadJobs();
            setTimeout(() => setFormSuccess(""), 4000);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Failed to create job.";
            setFormError(message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this job listing?"))
            return;
        setDeletingId(id);
        try {
            await deleteJob(id);
            setJobs((prev) => prev.filter((j) => j.id !== id));
        } catch {
            alert("Failed to delete job.");
        } finally {
            setDeletingId(null);
        }
    }

    /* Stats */
    const uniqueCategories = new Set(jobs.map((j) => j.category)).size;
    const uniqueLocations = new Set(jobs.map((j) => j.location)).size;

    return (
        <div>
            {/* Header band */}
            <div className="bg-[#F8F8FD] py-10 lg:py-14">
                <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
                    <h1
                        className="text-[36px] font-semibold leading-tight tracking-[-0.02em] text-[#25324B] md:text-[44px]"
                        style={{ fontFamily: "ClashDisplay, sans-serif" }}
                    >
                        Admin <span className="text-[#26A4FF]">Panel</span>
                    </h1>
                    <p className="mt-3 text-[17px] text-[#7C8493]">
                        Create and manage job listings
                    </p>

                    {/* Stats row */}
                    {!loading && (
                        <div className="mt-6 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[14px] shadow-sm">
                                <Briefcase className="h-4 w-4 text-[#4640DE]" />
                                <span className="font-semibold text-[#25324B]">
                                    {jobs.length}
                                </span>
                                <span className="text-[#7C8493]">
                                    Total Jobs
                                </span>
                            </div>
                            <div className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[14px] shadow-sm">
                                <span className="font-semibold text-[#25324B]">
                                    {uniqueCategories}
                                </span>
                                <span className="text-[#7C8493]">
                                    Categories
                                </span>
                            </div>
                            <div className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[14px] shadow-sm">
                                <MapPin className="h-4 w-4 text-[#4640DE]" />
                                <span className="font-semibold text-[#25324B]">
                                    {uniqueLocations}
                                </span>
                                <span className="text-[#7C8493]">
                                    Locations
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mx-auto w-full max-w-[1400px] px-6 py-10 lg:px-16">
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Create job form */}
                    <div className="w-full shrink-0 lg:w-[420px]">
                        <div className="sticky top-8 border border-[#D6DDEB] bg-white p-6">
                            <h2 className="flex items-center gap-2 text-[20px] font-semibold text-[#25324B]">
                                <Plus className="h-5 w-5 text-[#4640DE]" />
                                Post a New Job
                            </h2>

                            <form
                                onSubmit={handleCreate}
                                className="mt-6 space-y-4"
                            >
                                {formError && (
                                    <div className="rounded-md bg-red-50 p-3 text-[14px] text-red-600">
                                        {formError}
                                    </div>
                                )}
                                {formSuccess && (
                                    <div className="flex items-center gap-2 rounded-md bg-[#EBF5F4] p-3 text-[14px] text-[#056F51]">
                                        <CheckCircle2 className="h-4 w-4" />
                                        {formSuccess}
                                    </div>
                                )}

                                <div>
                                    <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                                        Job Title{" "}
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Senior Product Designer"
                                        className="h-11 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                                        Company{" "}
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Acme Corp"
                                        className="h-11 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                                            Location{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={form.location}
                                            onChange={handleChange}
                                            placeholder="e.g. Remote"
                                            className="h-11 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                                            Category{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            className="h-11 w-full border border-[#D6DDEB] bg-white px-3 text-[15px] text-[#25324B] outline-none focus:border-[#4640DE]"
                                        >
                                            <option value="">Select</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                                        Description{" "}
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Job description..."
                                        className="w-full resize-none border border-[#D6DDEB] bg-white px-4 py-3 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 bg-[#4640DE] text-[15px] font-semibold text-white transition hover:bg-[#3b35c9] disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Job"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Job list */}
                    <div className="flex-1">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-[20px] font-semibold text-[#25324B]">
                                Existing Jobs ({jobs.length})
                            </h2>

                            {/* Search in admin */}
                            {jobs.length > 0 && (
                                <div className="flex items-center gap-2 border border-[#D6DDEB] bg-white px-3 py-2">
                                    <Search className="h-4 w-4 text-[#7C8493]" />
                                    <input
                                        type="text"
                                        placeholder="Search jobs..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full bg-transparent text-[14px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] sm:w-[220px]"
                                    />
                                </div>
                            )}
                        </div>

                        {loading && (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="h-7 w-7 animate-spin text-[#4640DE]" />
                            </div>
                        )}

                        {!loading && jobs.length === 0 && (
                            <div className="rounded-md border border-dashed border-[#D6DDEB] py-16 text-center">
                                <Briefcase className="mx-auto h-10 w-10 text-[#D6DDEB]" />
                                <p className="mt-4 text-[16px] text-[#7C8493]">
                                    No jobs yet. Create one using the form.
                                </p>
                            </div>
                        )}

                        {!loading &&
                            jobs.length > 0 &&
                            filteredJobs.length === 0 && (
                                <p className="py-10 text-center text-[15px] text-[#7C8493]">
                                    No jobs matching &ldquo;{searchQuery}&rdquo;
                                </p>
                            )}

                        {!loading && filteredJobs.length > 0 && (
                            <div className="space-y-3">
                                {filteredJobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="flex items-center justify-between gap-4 border border-[#D6DDEB] bg-white p-4 transition hover:border-[#4640DE]/30"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#F0F0F7] text-[16px] font-bold text-[#4640DE]">
                                                {job.company.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="truncate text-[16px] font-semibold text-[#25324B]">
                                                    {job.title}
                                                </h3>
                                                <p className="truncate text-[13px] text-[#7C8493]">
                                                    {job.company} ·{" "}
                                                    {job.location} ·{" "}
                                                    {job.category}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1">
                                            <Link
                                                href={`/jobs/${job.id}`}
                                                className="flex h-9 w-9 items-center justify-center rounded-md text-[#7C8493] transition hover:bg-[#F8F8FD] hover:text-[#4640DE]"
                                                title="View job"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(job.id)
                                                }
                                                disabled={deletingId === job.id}
                                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[#7C8493] transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                                                title="Delete job"
                                            >
                                                {deletingId === job.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
