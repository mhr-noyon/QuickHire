"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import { fetchJobs } from "@/lib/api";
import { Job } from "@/lib/types";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import JobCard from "./JobCard";

/* Skeleton card for loading state */
function SkeletonCard() {
    return (
        <div className="flex animate-pulse flex-col gap-5 border border-[#D6DDEB] bg-white p-6">
            <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-md bg-[#F0F0F7]" />
                <div className="h-[36px] w-[90px] rounded bg-[#F0F0F7]" />
            </div>
            <div>
                <div className="h-5 w-3/4 rounded bg-[#F0F0F7]" />
                <div className="mt-2 h-4 w-1/2 rounded bg-[#F0F0F7]" />
            </div>
            <div className="flex gap-4">
                <div className="h-4 w-20 rounded bg-[#F0F0F7]" />
                <div className="h-4 w-20 rounded bg-[#F0F0F7]" />
                <div className="h-4 w-16 rounded bg-[#F0F0F7]" />
            </div>
            <div className="space-y-2">
                <div className="h-4 w-full rounded bg-[#F0F0F7]" />
                <div className="h-4 w-4/5 rounded bg-[#F0F0F7]" />
            </div>
            <div className="mt-auto pt-2">
                <div className="h-[32px] w-24 rounded-full bg-[#F0F0F7]" />
            </div>
        </div>
    );
}

/* Debounce hook */
function useDebounce(value: string, delay: number) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

export default function JobListings() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "";
    console.log("Initial category from URL:", initialCategory);

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* Filter state */
    const [search, setSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    /* Debounced search values for smoother filtering */
    const debouncedSearch = useDebounce(search, 250);
    const debouncedLocationSearch = useDebounce(locationSearch, 250);

    /* Fetch jobs */
    useEffect(() => {
        fetchJobs()
            .then((data) => {
                setJobs(data);
            })
            .catch(() => {
                console.error("Failed to fetch jobs. Is the backend running?");
                setError("Could not load jobs. Is the backend running?");
            })
            .finally(() => setLoading(false));
        console.log("Fetched jobs:", jobs);
    }, []);

    /* Derive unique filter options */
    const categories = useMemo(
        () => [...new Set(jobs.flatMap((j) => j.category.split(', ')))].sort(),
        [jobs],
    );
    const locations = useMemo(
        () => [...new Set(jobs.map((j) => j.location))].sort(),
        [jobs],
    );

    /* Count badges for sidebar */
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        jobs.forEach((j) => {
            j.category.split(', ').forEach((cat) => {
                counts[cat] = (counts[cat] || 0) + 1;
            });
        });
        return counts;
    }, [jobs]);

    const locationCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        jobs.forEach((j) => {
            counts[j.location] = (counts[j.location] || 0) + 1;
        });
        return counts;
    }, [jobs]);

    /* Filtered jobs */
    const filtered = useMemo(() => {
        return jobs.filter((job) => {
            const matchSearch =
                !debouncedSearch ||
                job.title
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase()) ||
                job.company
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase()) ||
                job.description
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase());

            const matchLocation =
                !debouncedLocationSearch ||
                job.location
                    .toLowerCase()
                    .includes(debouncedLocationSearch.toLowerCase());

            const matchCategory =
                !selectedCategory || job.category.split(', ').includes(selectedCategory);

            const matchLocationFilter =
                !selectedLocation || job.location === selectedLocation;

            return (
                matchSearch &&
                matchLocation &&
                matchCategory &&
                matchLocationFilter
            );
        });
    }, [
        jobs,
        debouncedSearch,
        debouncedLocationSearch,
        selectedCategory,
        selectedLocation,
    ]);

    /* Active filter count */
    const activeFilterCount = [
        search,
        locationSearch,
        selectedCategory,
        selectedLocation,
    ].filter(Boolean).length;

    const clearAll = useCallback(() => {
        setSearch("");
        setLocationSearch("");
        setSelectedCategory("");
        setSelectedLocation("");
    }, []);

    return (
        <div>
            {/* Hero / search area */}
            <div className="bg-[#F8F8FD] py-12 lg:py-16">
                <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
                    <h1
                        className="text-[36px] font-semibold leading-tight tracking-[-0.02em] text-[#25324B] md:text-[44px]"
                        style={{ fontFamily: "ClashDisplay, sans-serif" }}
                    >
                        Find your{" "}
                        <span className="text-[#26A4FF]">dream job</span>
                    </h1>
                    <p className="mt-3 text-[17px] text-[#7C8493]">
                        Find your next career at companies like HubSpot, Nike,
                        and Dropbox
                    </p>
                    <div className="mt-8 max-w-3xl">
                        <SearchBar
                            search={search}
                            location={locationSearch}
                            onSearchChange={setSearch}
                            onLocationChange={setLocationSearch}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto w-full max-w-[1400px] px-6 py-10 lg:px-16">
                {/* Mobile filter toggle */}
                <button
                    onClick={() => setShowFilters((p) => !p)}
                    className="mb-6 inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#D6DDEB] px-4 py-2 text-[15px] font-medium text-[#515B6F] transition hover:border-[#4640DE] hover:text-[#4640DE] lg:hidden"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    {showFilters ? "Hide Filters" : "Filters"}
                    {activeFilterCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4640DE] text-[12px] font-bold text-white">
                            {activeFilterCount}
                        </span>
                    )}
                </button>

                <div className="flex flex-col gap-10 lg:flex-row">
                    {/* Sidebar */}
                    <div
                        className={`w-full shrink-0 lg:block lg:w-[240px] ${
                            showFilters ? "block" : "hidden"
                        }`}
                    >
                        <FilterSidebar
                            categories={categories}
                            locations={locations}
                            selectedCategory={selectedCategory}
                            selectedLocation={selectedLocation}
                            onCategoryChange={setSelectedCategory}
                            onLocationChange={setSelectedLocation}
                            categoryCounts={categoryCounts}
                            locationCounts={locationCounts}
                            totalJobs={jobs.length}
                        />
                    </div>

                    {/* Job grid */}
                    <div className="flex-1">
                        {/* Skeleton loading */}
                        {loading && (
                            <div>
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="h-5 w-24 animate-pulse rounded bg-[#F0F0F7]" />
                                    <div className="h-4 w-32 animate-pulse rounded bg-[#F0F0F7]" />
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <SkeletonCard key={i} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="rounded-md bg-red-50 p-4 text-[15px] text-red-600">
                                {error}
                            </div>
                        )}

                        {!loading && !error && filtered.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-[18px] text-[#7C8493]">
                                    No jobs found matching your criteria.
                                </p>
                                <button
                                    onClick={clearAll}
                                    className="mt-4 cursor-pointer text-[15px] font-semibold text-[#4640DE] hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {!loading && !error && filtered.length > 0 && (
                            <>
                                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-[18px] font-semibold text-[#25324B]">
                                            All Jobs
                                        </h2>
                                        {activeFilterCount > 0 && (
                                            <button
                                                onClick={clearAll}
                                                className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-[#F0F0F7] px-3 py-1 text-[13px] text-[#515B6F] transition hover:bg-[#E5E5EF]"
                                            >
                                                <X className="h-3 w-3" /> Clear
                                                filters
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[15px] text-[#7C8493]">
                                        Showing{" "}
                                        <span className="font-medium text-[#25324B]">
                                            {filtered.length}
                                        </span>{" "}
                                        result
                                        {filtered.length !== 1 && "s"}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {filtered.map((job) => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
