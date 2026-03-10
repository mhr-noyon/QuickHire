"use client";
import { useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { Search, MapPin, ChevronDown } from "lucide-react";

export default function HeroSection() {
    const [selectedLocation, setSelectedLocation] = useState("Florence, Italy");
    const [isOpen, setIsOpen] = useState(false);

    const locations = [
        "Florence, Italy",
        "Madrid, Spain",
        "Berlin, Germany",
        "Ontario, Canada",
    ];
    return (
        <section className="relative overflow-hidden bg-[#F8F8FD]">
            <Container className="relative z-10">
                <div className="grid min-h-[720px] items-center lg:grid-cols-[620px_1fr] lg:gap-0">
                    <div className="w-full">
                        <h1
                            className="text-[54px] leading-[0.98] font-semibold tracking-[-0.03em] text-[#25324B] md:text-[64px] lg:text-[72px]"
                            style={{ fontFamily: "ClashDisplay, sans-serif" }}
                        >
                            Discover
                            <br />
                            more than
                            <br />
                            <span className="relative inline-block text-[#26A4FF]">
                                5000+ Jobs
                                <span className="absolute left-0 top-[92%] w-[105%]">
                                    <svg
                                        viewBox="0 0 470 26"
                                        className="h-[20px] w-full"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M7 10C145 2 292 2 458 8"
                                            stroke="#26A4FF"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M20 21C155 14 300 13 448 15"
                                            stroke="#26A4FF"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </span>
                        </h1>

                        <p className="font-epilogue mt-10 max-w-[560px] text-[20px] leading-[1.6] text-[#7C8493]">
                            Great platform for the job seeker that searching for
                            new career heights and passionate about startups.
                        </p>

                        <div className="relative z-20 mt-10 w-full lg:w-[900px]">
                            {/* Main Card Container */}
                            <div className="bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-2 lg:h-[50px]">
                                    {/* 1. Job Input Section */}
                                    <div className="flex flex-1 items-center gap-4 w-full lg:pr-4">
                                        <Search
                                            className="h-6 w-6 text-[#25324B] shrink-0"
                                            strokeWidth={2.5}
                                        />
                                        <div className="w-full border-b-[1.5px] border-[#D6DDEB] py-2">
                                            <input
                                                type="text"
                                                placeholder="Job title or keyword"
                                                className="w-full bg-transparent text-[18px] font-medium text-[#25324B] outline-none placeholder:text-[#A8ADB7]"
                                            />
                                        </div>
                                    </div>

                                    {/* 2. Location Section - Adjusted padding for mobile */}
                                    <div className="relative flex flex-1 items-center gap-4 w-full lg:px-4">
                                        <MapPin
                                            className="h-6 w-6 text-[#25324B] shrink-0"
                                            strokeWidth={2.5}
                                        />

                                        <div className="relative w-full">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsOpen((prev) => !prev)
                                                }
                                                className="flex w-full items-center justify-between border-b-[1.5px] border-[#D6DDEB] py-2 cursor-pointer text-left"
                                            >
                                                <span className="text-[18px] font-medium text-[#25324B]">
                                                    {selectedLocation}
                                                </span>
                                                <ChevronDown
                                                    className={`h-5 w-5 text-[#7C8493] transition-transform ${
                                                        isOpen
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </button>

                                            {isOpen && (
                                                <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-[220px] rounded-md border border-[#D6DDEB] bg-white shadow-lg">
                                                    <ul className="py-2">
                                                        {locations.map(
                                                            (location) => {
                                                                if (
                                                                    location ===
                                                                    selectedLocation
                                                                )
                                                                    return null;
                                                                return (
                                                                    <li
                                                                        key={
                                                                            location
                                                                        }
                                                                        onClick={() => {
                                                                            setSelectedLocation(
                                                                                location,
                                                                            );
                                                                            setIsOpen(
                                                                                false,
                                                                            );
                                                                        }}
                                                                        className="cursor-pointer px-4 py-2 text-[16px] text-[#25324B] hover:bg-[#F8F8FD]"
                                                                    >
                                                                        {
                                                                            location
                                                                        }
                                                                    </li>
                                                                );
                                                            },
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* 4. The Button - Added mt-2 for mobile spacing */}
                                    <button
                                        type="button"
                                        className="cursor-pointer w-full lg:w-auto lg:min-w-[210px] h-full bg-[#4640DE] px-10 py-4 lg:py-0 text-[18px] font-bold text-white transition-all hover:bg-[#3b36c0] active:scale-95 mt-2 lg:mt-0"
                                    >
                                        Search my job
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-5 text-[18px] text-[#7C8493]">
                            <span className="text-[#515B6F]">Popular :</span> UI
                            Designer, UX Researcher, Android, Admin
                        </p>
                    </div>

                    <div className="relative hidden min-h-[720px] lg:flex lg:items-end lg:justify-end">
                        <div className="relative z-10 w-full max-w-[480px] overflow-hidden">
                            <Image
                                src="/human1.png"
                                alt="Smiling professional"
                                width={760}
                                height={900}
                                priority
                                className="block h-auto w-full object-cover object-bottom"
                            />
                        </div>
                    </div>
                </div>
            </Container>

            <div
                className="absolute bottom-0 right-0 z-20 hidden w-[300px] md:h-[120px] md:w-[200px] lg:h-[250px] lg:w-[430px] overflow-hidden bg-white lg:block"
                style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
            />
        </section>
    );
}
