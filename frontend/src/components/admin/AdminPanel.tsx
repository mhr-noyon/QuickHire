"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Briefcase, MapPin, FileText } from "lucide-react";
import { checkAdminAuth, fetchApplications, fetchJobs } from "@/lib/api";
import { Job, ApplicationWithJob } from "@/lib/types";
import ApplicationDetailModal from "./ApplicationDetailModal";
import ApplicationList from "./ApplicationList";
import JobList from "./JobList";

type Tab = "jobs" | "applications";

export default function AdminPanel() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

    const [activeTab, setActiveTab] = useState<Tab>("jobs");

    /* ── Applications state ── */
    const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
    const [appsLoading, setAppsLoading] = useState(false);
    const [appSearch, setAppSearch] = useState("");
    const [viewApp, setViewApp] = useState<ApplicationWithJob | null>(null);

    /* ── Auth check ── */
    useEffect(() => {
        checkAdminAuth().then((ok) => {
            if (!ok) {
                router.replace("/login");
            } else {
                setAuthChecked(true);
            }
        });
    }, [router]);

    /* ── Stats ── */
    const uniqueCategories = new Set(jobs.map((j) => j.category)).size;
    const uniqueLocations = new Set(jobs.map((j) => j.location)).size;

    /* ── Load applications when tab switches ── */
    const loadApplications = useCallback(() => {
        setAppsLoading(true);
        fetchApplications()
            .then(setApplications)
            .catch(() => {})
            .finally(() => setAppsLoading(false));
    }, []);

    useEffect(() => {
        if (authChecked) loadApplications();
    }, [authChecked, loadApplications]);

    useEffect(() => {
        if (authChecked && activeTab === "applications") loadApplications();
    }, [authChecked, activeTab, loadApplications]);

    const filteredApps = useMemo(() => {
        if (!appSearch.trim()) return applications;
        const q = appSearch.toLowerCase();
        return applications.filter(
            (a) =>
                a.name.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q) ||
                (a.job_title && a.job_title.toLowerCase().includes(q)) ||
                (a.job_company && a.job_company.toLowerCase().includes(q)),
        );
    }, [applications, appSearch]);

    if (!authChecked) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#4640DE]" />
            </div>
        );
    }

    return (
        <div>
            {/* Application detail modal */}
            {viewApp && (
                <ApplicationDetailModal
                    app={viewApp}
                    onClose={() => setViewApp(null)}
                />
            )}

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
                            <div className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[14px] shadow-sm">
                                <FileText className="h-4 w-4 text-[#4640DE]" />
                                <span className="font-semibold text-[#25324B]">
                                    {applications.length || "—"}
                                </span>
                                <span className="text-[#7C8493]">
                                    Applications
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="mt-8 flex gap-6 border-b border-[#D6DDEB]">
                        <button
                            onClick={() => setActiveTab("jobs")}
                            className={`cursor-pointer border-b-2 pb-3 text-[15px] font-semibold transition ${
                                activeTab === "jobs"
                                    ? "border-[#4640DE] text-[#4640DE]"
                                    : "border-transparent text-[#7C8493] hover:text-[#25324B]"
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                Jobs
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("applications")}
                            className={`cursor-pointer border-b-2 pb-3 text-[15px] font-semibold transition ${
                                activeTab === "applications"
                                    ? "border-[#4640DE] text-[#4640DE]"
                                    : "border-transparent text-[#7C8493] hover:text-[#25324B]"
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Applications
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-[1400px] px-6 py-10 lg:px-16">
                {/* ═══════════ JOBS TAB ═══════════ */}
                {activeTab === "jobs" && (
                    <JobList
                        authChecked={authChecked}
                        jobs={jobs}
                        setJobs={setJobs}
                        loading={loading}
                        setLoading={setLoading}
                    />
                )}

                {/* ═══════════ APPLICATIONS TAB ═══════════ */}
                {activeTab === "applications" && (
                    <ApplicationList
                        applications={applications}
                        appSearch={appSearch}
                        setAppSearch={setAppSearch}
                        appsLoading={appsLoading}
                        filteredApps={filteredApps}
                        setViewApp={setViewApp}
                    />
                )}
            </div>
        </div>
    );
}
