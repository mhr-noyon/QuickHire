"use client";

import { ChevronDown } from "lucide-react";

interface FilterSidebarProps {
    categories: string[];
    locations: string[];
    selectedCategory: string;
    selectedLocation: string;
    onCategoryChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    categoryCounts: Record<string, number>;
    locationCounts: Record<string, number>;
    totalJobs: number;
}

export default function FilterSidebar({
    categories,
    locations,
    selectedCategory,
    selectedLocation,
    onCategoryChange,
    onLocationChange,
    categoryCounts,
    locationCounts,
    totalJobs,
}: FilterSidebarProps) {
    return (
        <aside className="space-y-3">
            {/* Category dropdown */}
            <div className="group relative">
                <button className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#D6DDEB] bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#4640DE]/40">
                    <div>
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-[#7C8493]">
                            Category
                        </span>
                        <span className="mt-0.5 block text-[15px] font-semibold text-[#25324B]">
                            {selectedCategory || "All Categories"}
                        </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-[#7C8493] transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className="invisible absolute left-0 right-0 top-full z-20 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <ul className="max-h-[300px] overflow-y-auto rounded-lg border border-[#D6DDEB] bg-white py-1 shadow-lg">
                        <li>
                            <button
                                onClick={() => onCategoryChange("")}
                                className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-[14px] transition ${
                                    selectedCategory === ""
                                        ? "bg-[#4640DE] font-medium text-white"
                                        : "text-[#515B6F] hover:bg-[#F8F8FD]"
                                }`}
                            >
                                <span>All Categories</span>
                                <span
                                    className={`text-[12px] ${selectedCategory === "" ? "text-white/70" : "text-[#A8ADB7]"}`}
                                >
                                    {totalJobs}
                                </span>
                            </button>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => onCategoryChange(cat)}
                                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-[14px] transition ${
                                        selectedCategory === cat
                                            ? "bg-[#4640DE] font-medium text-white"
                                            : "text-[#515B6F] hover:bg-[#F8F8FD]"
                                    }`}
                                >
                                    <span>{cat}</span>
                                    <span
                                        className={`text-[12px] ${selectedCategory === cat ? "text-white/70" : "text-[#A8ADB7]"}`}
                                    >
                                        {categoryCounts[cat] || 0}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Location dropdown */}
            <div className="group relative">
                <button className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#D6DDEB] bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#4640DE]/40">
                    <div>
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-[#7C8493]">
                            Location
                        </span>
                        <span className="mt-0.5 block text-[15px] font-semibold text-[#25324B]">
                            {selectedLocation || "All Locations"}
                        </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-[#7C8493] transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div className="invisible absolute left-0 right-0 top-full z-20 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <ul className="max-h-[300px] overflow-y-auto rounded-lg border border-[#D6DDEB] bg-white py-1 shadow-lg">
                        <li>
                            <button
                                onClick={() => onLocationChange("")}
                                className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-[14px] transition ${
                                    selectedLocation === ""
                                        ? "bg-[#4640DE] font-medium text-white"
                                        : "text-[#515B6F] hover:bg-[#F8F8FD]"
                                }`}
                            >
                                <span>All Locations</span>
                                <span
                                    className={`text-[12px] ${selectedLocation === "" ? "text-white/70" : "text-[#A8ADB7]"}`}
                                >
                                    {totalJobs}
                                </span>
                            </button>
                        </li>
                        {locations.map((loc) => (
                            <li key={loc}>
                                <button
                                    onClick={() => onLocationChange(loc)}
                                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-[14px] transition ${
                                        selectedLocation === loc
                                            ? "bg-[#4640DE] font-medium text-white"
                                            : "text-[#515B6F] hover:bg-[#F8F8FD]"
                                    }`}
                                >
                                    <span>{loc}</span>
                                    <span
                                        className={`text-[12px] ${selectedLocation === loc ? "text-white/70" : "text-[#A8ADB7]"}`}
                                    >
                                        {locationCounts[loc] || 0}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}
