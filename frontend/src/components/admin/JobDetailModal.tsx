/* ── Job detail popup ── */

import { Job } from "@/lib/types";
import { Briefcase, Calendar, ExternalLink, MapPin, X } from "lucide-react";

export default function JobDetailModal({ job, onClose }: { job: Job; onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className="mx-4 max-h-[85vh] w-full max-w-[600px] overflow-y-auto rounded-lg border border-[#D6DDEB] bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#D6DDEB] px-6 py-4">
                    <h2 className="text-[18px] font-semibold text-[#25324B]">
                        Job Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[#7C8493] transition hover:bg-[#F8F8FD] hover:text-[#25324B]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#F0F0F7] text-[20px] font-bold text-[#4640DE]">
                            {job.logo ? (
                                <img src={job.logo} alt={job.company} className="h-full w-full object-cover" />
                            ) : (
                                job.company.charAt(0)
                            )}
                        </div>
                        <div>
                            <h3 className="text-[20px] font-semibold text-[#25324B]">
                                {job.title}
                            </h3>
                            <p className="text-[15px] text-[#515B6F]">
                                {job.company}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-4 text-[14px] text-[#7C8493]">
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" /> {job.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
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

                    <div className="mt-6 border-t border-[#D6DDEB] pt-5">
                        <h4 className="text-[15px] font-semibold text-[#25324B]">
                            Description
                        </h4>
                        <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-[#515B6F]">
                            {job.description}
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <a
                            href={`/jobs/${job.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#4640DE] hover:underline"
                        >
                            <ExternalLink className="h-4 w-4" /> Open public
                            page
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}