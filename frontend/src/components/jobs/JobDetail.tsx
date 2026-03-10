"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, Calendar } from "lucide-react";
import { fetchJobById } from "@/lib/api";
import { Job } from "@/lib/types";
import ApplicationForm from "./ApplicationForm";

interface JobDetailProps {
    jobId: string;
}

export default function JobDetail({ jobId }: JobDetailProps) {
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cameFromAdmin, setCameFromAdmin] = useState(false);

    useEffect(() => {
        if (document.referrer.includes("/admin")) {
            setCameFromAdmin(true);
        }
    }, []);

    useEffect(() => {
        fetchJobById(jobId)
            .then(setJob)
            .catch(() => setError("Could not load job details."))
            .finally(() => setLoading(false));
    }, [jobId]);

    function handleBack() {
        if (cameFromAdmin) {
            router.push("/admin");
        } else {
            router.push("/jobs");
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4640DE] border-t-transparent" />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-16 text-center">
                <p className="text-[18px] text-[#7C8493]">
                    {error || "Job not found."}
                </p>
                <button
                    onClick={handleBack}
                    className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[15px] font-semibold text-[#4640DE] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />{" "}
                    {cameFromAdmin ? "Back to admin" : "Back to jobs"}
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Header band */}
            <div className="bg-[#F8F8FD] py-10 lg:py-14">
                <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
                    <button
                        onClick={handleBack}
                        className="inline-flex cursor-pointer items-center gap-2 text-[15px] font-medium text-[#4640DE] hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" />{" "}
                        {cameFromAdmin ? "Back to admin" : "Back to jobs"}
                    </button>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white text-[24px] font-bold text-[#4640DE] shadow-sm">
                                {job.logo ? (
                                    <img
                                        src={job.logo}
                                        alt={`${job.company} logo`}
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    job.company.charAt(0)
                                )}
                            </div>
                            <div>
                                <h1 className="text-[28px] font-semibold text-[#25324B] md:text-[34px]">
                                    {job.title}
                                </h1>
                                <p className="mt-1 text-[16px] text-[#515B6F]">
                                    {job.company}
                                </p>
                            </div>
                        </div>

                        <span className="inline-flex h-[42px] w-fit items-center border border-[#4640DE] px-5 text-[16px] font-medium text-[#4640DE]">
                            Full Time
                        </span>
                    </div>

                    {/* Meta */}
                    <div className="mt-5 flex flex-wrap gap-6 text-[15px] text-[#7C8493]">
                        <span className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Briefcase className="h-4 w-4" /> {job.category}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> Posted{" "}
                            {new Date(job.created_at).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                },
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="mx-auto w-full max-w-[1400px] px-6 py-12 lg:px-16">
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Description */}
                    <div className="flex-1">
                        <h2 className="text-[22px] font-semibold text-[#25324B]">
                            Description
                        </h2>
                        <div className="mt-4 whitespace-pre-line text-[16px] leading-[1.8] text-[#515B6F]">
                            {job.description}
                        </div>
                    </div>

                    {/* Application form */}
                    <div className="w-full shrink-0 lg:w-[400px]">
                        <div className="sticky top-8 border border-[#D6DDEB] bg-white p-6">
                            <h2 className="mb-6 text-[20px] font-semibold text-[#25324B]">
                                Apply for this job
                            </h2>
                            <ApplicationForm jobId={job.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
