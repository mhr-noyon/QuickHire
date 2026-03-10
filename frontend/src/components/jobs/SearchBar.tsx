"use client";

import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
    search: string;
    location: string;
    onSearchChange: (value: string) => void;
    onLocationChange: (value: string) => void;
}

export default function SearchBar({
    search,
    location,
    onSearchChange,
    onLocationChange,
}: SearchBarProps) {
    return (
        <div className="bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Job title search */}
                <div className="flex flex-1 items-center gap-3 border-b border-[#D6DDEB] pb-2 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
                    <Search
                        className="h-5 w-5 shrink-0 text-[#25324B]"
                        strokeWidth={2.2}
                    />
                    <input
                        type="text"
                        placeholder="Job title or keyword"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-transparent text-[16px] text-[#25324B] outline-none placeholder:text-[#A8ADB7]"
                    />
                </div>

                {/* Location search */}
                <div className="flex flex-1 items-center gap-3 sm:pl-4">
                    <MapPin
                        className="h-5 w-5 shrink-0 text-[#25324B]"
                        strokeWidth={2.2}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => onLocationChange(e.target.value)}
                        className="w-full bg-transparent text-[16px] text-[#25324B] outline-none placeholder:text-[#A8ADB7]"
                    />
                </div>
            </div>
        </div>
    );
}
