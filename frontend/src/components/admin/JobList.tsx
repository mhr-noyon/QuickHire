"use client";
import { Job } from "@/lib/types";
import {
    Briefcase,
    CheckCircle2,
    ExternalLink,
    Loader2,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { createJob, deleteJob, fetchJobs } from "@/lib/api";
import ConfirmModal from "./ConfirmModal";
import JobDetailModal from "./JobDetailModal";
import { categories } from "@/lib/CategoryList";

const emptyForm = {
    title: "",
    company: "",
    location: "",
    category: [] as string[],
    description: "",
    logo: null as string | null,
};
interface JobListProps {
    authChecked: boolean;
    jobs: Job[];
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export default function JobList({
    authChecked,
    jobs,
    setJobs,
    loading,
    setLoading,
}: JobListProps) {
    /* ── Jobs state ── */
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewJob, setViewJob] = useState<Job | null>(null);

    /* ── Load jobs ── */
    const loadJobs = useCallback(() => {
        setLoading(true);
        fetchJobs()
            .then(setJobs)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (authChecked) loadJobs();
    }, [authChecked, loadJobs]);

    /* ── Form handlers ── */
    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) {
        const target = e.target;

        setForm((prev) => ({
            ...prev,
            [target.name]:
                target instanceof HTMLSelectElement && target.multiple
                    ? Array.from(
                          target.selectedOptions,
                          (option) => option.value,
                      )
                    : target.value,
        }));

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
            form.category.length === 0 ||
            !form.description.trim()
        ) {
            setFormError("All fields are required.");
            return;
        }

        setSubmitting(true);
        try {
            await createJob({
                ...form,
                category: form.category.join(","),
            });
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
    async function handleDeleteConfirmed() {
        if (!deleteTarget) return;
        setDeletingId(deleteTarget.id);
        try {
            await deleteJob(deleteTarget.id);
            // setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id));
            setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id));
        } catch {
            alert("Failed to delete job.");
        } finally {
            setDeletingId(null);
            setDeleteTarget(null);
        }
    }

    /* ── Filtered lists ── */
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

    return (
        <div>
            {/* Confirm delete modal */}
            {deleteTarget && (
                <ConfirmModal
                    jobTitle={deleteTarget.title}
                    onConfirm={handleDeleteConfirmed}
                    onCancel={() => setDeleteTarget(null)}
                    loading={deletingId === deleteTarget.id}
                />
            )}

            {/* Job detail modal */}
            {viewJob && (
                <JobDetailModal
                    job={viewJob}
                    onClose={() => setViewJob(null)}
                />
            )}
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
                            <div>
                                <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                                    Company Logo URL
                                </label>
                                <input
                                    type="text"
                                    name="logo"
                                    value={form.logo || ""}
                                    onChange={handleChange}
                                    placeholder="e.g. https://example.com/logo.png"
                                    className="h-11 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                                        Location{" "}
                                        <span className="text-red-400">*</span>
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
                                <div className="group relative">
                                    <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                                        Category{" "}
                                        <span className="text-red-400">*</span>
                                    </label>

                                    {/* The "Field" appearance */}
                                    <div className="flex min-h-[45px] w-full cursor-pointer items-center justify-between border border-[#D6DDEB] bg-white px-3 py-2 transition-all group-hover:border-[#4640DE]">
                                        <span className="text-[14px] text-[#7C8493]">
                                            {form.category.length > 0
                                                ? `${form.category.length} categories selected`
                                                : "Select Categories..."}
                                        </span>
                                        <svg
                                            className="h-4 w-4 text-[#7C8493]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>

                                    {/* The Dropdown List - Shows on Hover */}
                                    <div className="invisible absolute z-10 w-full opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                        <div className="mt-1 max-h-[200px] overflow-y-auto border border-[#D6DDEB] bg-white p-3 shadow-lg">
                                            <div className="space-y-2">
                                                {categories.map((cat) => (
                                                    <label
                                                        key={cat}
                                                        className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-[15px] text-[#25324B] hover:bg-[#F8F8FD]"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={form.category.includes(
                                                                cat,
                                                            )}
                                                            onChange={(e) => {
                                                                const checked =
                                                                    e.target
                                                                        .checked;
                                                                setForm(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        category:
                                                                            checked
                                                                                ? [
                                                                                      ...prev.category,
                                                                                      cat,
                                                                                  ]
                                                                                : prev.category.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          cat,
                                                                                  ),
                                                                    }),
                                                                );
                                                                if (formError)
                                                                    setFormError(
                                                                        "",
                                                                    );
                                                                if (formSuccess)
                                                                    setFormSuccess(
                                                                        "",
                                                                    );
                                                            }}
                                                            className="h-4 w-4 accent-[#4640DE]"
                                                        />
                                                        <span
                                                            className="truncate"
                                                            title={cat}
                                                        >
                                                            {cat}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Selected Tags - Shown below the field */}
                                {form.category.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {form.category.map((cat) => (
                                            <span
                                                key={cat}
                                                className="flex items-center gap-1 rounded-sm bg-[#F0F0F7] px-3 py-1 text-[12px] font-medium text-[#4640DE]"
                                            >
                                                {cat}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            category:
                                                                prev.category.filter(
                                                                    (c) =>
                                                                        c !==
                                                                        cat,
                                                                ),
                                                        }))
                                                    }
                                                    className="hover:text-red-500"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
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
                                No jobs matching &ldquo;{searchQuery}
                                &rdquo;
                            </p>
                        )}

                    {!loading && filteredJobs.length > 0 && (
                        <div className="space-y-3">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="flex items-center justify-between gap-4 border border-[#D6DDEB] bg-white p-4 transition hover:border-[#4640DE]/30"
                                >
                                    <div className="flex min-w-0 items-center gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#F0F0F7] text-[16px] font-bold text-[#4640DE]">
                                            {job.company.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="truncate text-[16px] font-semibold text-[#25324B]">
                                                {job.title}
                                            </h3>
                                            <p className="truncate text-[13px] text-[#7C8493]">
                                                {job.company} · {job.location} ·{" "}
                                                {job.category}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-1">
                                        <button
                                            onClick={() => setViewJob(job)}
                                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[#7C8493] transition hover:bg-[#F8F8FD] hover:text-[#4640DE]"
                                            title="View job"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteTarget(job)}
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
    );
}
