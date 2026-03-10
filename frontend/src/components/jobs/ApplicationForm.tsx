"use client";

import { useState } from "react";
import { submitApplication } from "@/lib/api";

interface ApplicationFormProps {
    jobId: number;
}

export default function ApplicationForm({ jobId }: ApplicationFormProps) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        resume_link: "",
        cover_note: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        /* Basic validation */
        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.resume_link.trim()
        ) {
            setError("Name, email, and resume link are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            new URL(form.resume_link);
        } catch {
            setError("Resume link must be a valid URL (e.g. https://...).");
            return;
        }

        setSubmitting(true);
        try {
            await submitApplication({ job_id: jobId, ...form });
            setSuccess(true);
            setForm({ name: "", email: "", resume_link: "", cover_note: "" });
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    if (success) {
        return (
            <div className="rounded-md bg-[#EBF5F4] p-6 text-center">
                <p className="text-[18px] font-semibold text-[#056F51]">
                    Application submitted successfully!
                </p>
                <p className="mt-2 text-[15px] text-[#515B6F]">
                    We&apos;ll be in touch soon.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 cursor-pointer text-[15px] font-semibold text-[#4640DE] hover:underline"
                >
                    Submit another application
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="rounded-md bg-red-50 p-3 text-[14px] text-red-600">
                    {error}
                </div>
            )}

            <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="h-12 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="h-12 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                    Resume Link (URL) <span className="text-red-500">*</span>
                </label>
                <input
                    type="url"
                    name="resume_link"
                    value={form.resume_link}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/your-resume"
                    className="h-12 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                    Cover Note
                </label>
                <textarea
                    name="cover_note"
                    value={form.cover_note}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us why you're a great fit for this role..."
                    className="w-full resize-none border border-[#D6DDEB] bg-white px-4 py-3 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="h-12 w-full cursor-pointer bg-[#4640DE] text-[16px] font-semibold text-white transition hover:bg-[#3b35c9] disabled:opacity-50"
            >
                {submitting ? "Submitting..." : "Apply Now"}
            </button>
        </form>
    );
}
