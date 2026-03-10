import { ApplicationWithJob } from "@/lib/types";
import { LinkIcon, X } from "lucide-react";
export default /* ── Application detail popup ── */
function ApplicationDetailModal({
    app,
    onClose,
}: {
    app: ApplicationWithJob;
    onClose: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className="mx-4 max-h-[85vh] w-full max-w-[520px] overflow-y-auto rounded-lg border border-[#D6DDEB] bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#D6DDEB] px-6 py-4">
                    <h2 className="text-[18px] font-semibold text-[#25324B]">
                        Application Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[#7C8493] transition hover:bg-[#F8F8FD] hover:text-[#25324B]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Applicant info */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0F0F7] text-[18px] font-bold text-[#4640DE]">
                            {app.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-[18px] font-semibold text-[#25324B]">
                                {app.name}
                            </h3>
                            <p className="text-[14px] text-[#7C8493]">
                                {app.email}
                            </p>
                        </div>
                    </div>

                    {/* Applied for */}
                    <div className="mt-5 rounded-md bg-[#F8F8FD] p-4">
                        <p className="text-[12px] font-medium uppercase tracking-wider text-[#7C8493]">
                            Applied for
                        </p>
                        <p className="mt-1 text-[15px] font-semibold text-[#25324B]">
                            {app.job_title || "Deleted Job"}
                        </p>
                        {app.job_company && (
                            <p className="text-[13px] text-[#515B6F]">
                                {app.job_company}
                            </p>
                        )}
                    </div>

                    {/* Resume */}
                    <div className="mt-5">
                        <p className="text-[12px] font-medium uppercase tracking-wider text-[#7C8493]">
                            Resume
                        </p>
                        <a
                            href={app.resume_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4640DE] hover:underline"
                        >
                            <LinkIcon className="h-4 w-4" /> View Resume
                        </a>
                    </div>

                    {/* Cover note */}
                    {app.cover_note && (
                        <div className="mt-5">
                            <p className="text-[12px] font-medium uppercase tracking-wider text-[#7C8493]">
                                Cover Note
                            </p>
                            <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-[#515B6F]">
                                {app.cover_note}
                            </p>
                        </div>
                    )}

                    {/* Date */}
                    <div className="mt-5 border-t border-[#D6DDEB] pt-4 text-[13px] text-[#A8ADB7]">
                        Applied on{" "}
                        {new Date(app.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}