import { ApplicationWithJob } from "@/lib/types";
import { FileText, Loader2, Search, X } from "lucide-react";

export default function ApplicationList({
    applications,
    appSearch,
    setAppSearch,
    appsLoading,
    filteredApps,
    setViewApp,
}: {
    applications: ApplicationWithJob[];
    appSearch: string | null;
    setAppSearch: (value: string) => void;
    appsLoading: boolean;
    filteredApps: ApplicationWithJob[];
    setViewApp: (app: ApplicationWithJob | null) => void;
}) {
    return (
        <div>
            {applications.length === 0 ? (
                <div className="rounded-md border border-dashed border-[#D6DDEB] py-16 text-center">
                    <FileText className="mx-auto h-10 w-10 text-[#D6DDEB]" />
                    <p className="mt-4 text-[16px] text-[#7C8493]">
                        No applications received yet.
                    </p>
                </div>
            ) : (
                <div>
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-[20px] font-semibold text-[#25324B]">
                            All Applications ({applications.length})
                        </h2>

                        <div className="flex items-center gap-2 border border-[#D6DDEB] bg-white px-3 py-2">
                            <Search className="h-4 w-4 text-[#7C8493]" />
                            <input
                                type="text"
                                placeholder="Search by name, email, job..."
                                value={appSearch || ""}
                                onChange={(e) => setAppSearch(e.target.value)}
                                className="w-full bg-transparent text-[14px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] sm:w-[280px]"
                            />
                            {appSearch && (
                                <button
                                    onClick={() => setAppSearch("")}
                                    className="cursor-pointer text-[#A8ADB7] hover:text-[#25324B]"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {appsLoading && (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="h-7 w-7 animate-spin text-[#4640DE]" />
                        </div>
                    )}

                    {!appsLoading && applications.length === 0 && (
                        <div className="rounded-md border border-dashed border-[#D6DDEB] py-16 text-center">
                            <FileText className="mx-auto h-10 w-10 text-[#D6DDEB]" />
                            <p className="mt-4 text-[16px] text-[#7C8493]">
                                No applications received yet.
                            </p>
                        </div>
                    )}

                    {!appsLoading &&
                        applications.length > 0 &&
                        filteredApps.length === 0 && (
                            <p className="py-10 text-center text-[15px] text-[#7C8493]">
                                No applications matching &ldquo;{appSearch}
                                &rdquo;
                            </p>
                        )}

                    {!appsLoading && filteredApps.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {filteredApps.map((app) => (
                                <div
                                    key={app.id}
                                    onClick={() => setViewApp(app)}
                                    className="cursor-pointer rounded-lg border border-[#D6DDEB] bg-white p-5 transition hover:border-[#4640DE]/40 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0F0F7] text-[15px] font-bold text-[#4640DE]">
                                            {app.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="truncate text-[15px] font-semibold text-[#25324B]">
                                                {app.name}
                                            </h3>
                                            <p className="truncate text-[13px] text-[#7C8493]">
                                                {app.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 rounded-md bg-[#F8F8FD] px-3 py-2">
                                        <p className="truncate text-[13px] font-medium text-[#4640DE]">
                                            {app.job_title || "Deleted Job"}
                                        </p>
                                        {app.job_company && (
                                            <p className="truncate text-[12px] text-[#7C8493]">
                                                {app.job_company}
                                            </p>
                                        )}
                                    </div>

                                    {app.cover_note && (
                                        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-[#515B6F]">
                                            {app.cover_note}
                                        </p>
                                    )}

                                    <p className="mt-3 text-[11px] text-[#A8ADB7]">
                                        {new Date(
                                            app.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
