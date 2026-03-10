"use client";

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
        <aside className="space-y-8">
            {/* Category filter */}
            <div>
                <h3 className="mb-4 text-[18px] font-semibold text-[#25324B]">
                    Category
                </h3>
                <ul className="space-y-1">
                    <li>
                        <button
                            onClick={() => onCategoryChange("")}
                            className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-[15px] transition ${
                                selectedCategory === ""
                                    ? "bg-[#4640DE] font-medium text-white"
                                    : "text-[#515B6F] hover:bg-[#F8F8FD]"
                            }`}
                        >
                            <span>All Categories</span>
                            <span
                                className={`text-[13px] ${selectedCategory === "" ? "text-white/70" : "text-[#A8ADB7]"}`}
                            >
                                {totalJobs}
                            </span>
                        </button>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat}>
                            <button
                                onClick={() => onCategoryChange(cat)}
                                className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-[15px] transition ${
                                    selectedCategory === cat
                                        ? "bg-[#4640DE] font-medium text-white"
                                        : "text-[#515B6F] hover:bg-[#F8F8FD]"
                                }`}
                            >
                                <span>{cat}</span>
                                <span
                                    className={`text-[13px] ${selectedCategory === cat ? "text-white/70" : "text-[#A8ADB7]"}`}
                                >
                                    {categoryCounts[cat] || 0}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Location filter */}
            <div>
                <h3 className="mb-4 text-[18px] font-semibold text-[#25324B]">
                    Location
                </h3>
                <ul className="space-y-1">
                    <li>
                        <button
                            onClick={() => onLocationChange("")}
                            className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-[15px] transition ${
                                selectedLocation === ""
                                    ? "bg-[#4640DE] font-medium text-white"
                                    : "text-[#515B6F] hover:bg-[#F8F8FD]"
                            }`}
                        >
                            <span>All Locations</span>
                            <span
                                className={`text-[13px] ${selectedLocation === "" ? "text-white/70" : "text-[#A8ADB7]"}`}
                            >
                                {totalJobs}
                            </span>
                        </button>
                    </li>
                    {locations.map((loc) => (
                        <li key={loc}>
                            <button
                                onClick={() => onLocationChange(loc)}
                                className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-[15px] transition ${
                                    selectedLocation === loc
                                        ? "bg-[#4640DE] font-medium text-white"
                                        : "text-[#515B6F] hover:bg-[#F8F8FD]"
                                }`}
                            >
                                <span>{loc}</span>
                                <span
                                    className={`text-[13px] ${selectedLocation === loc ? "text-white/70" : "text-[#A8ADB7]"}`}
                                >
                                    {locationCounts[loc] || 0}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
