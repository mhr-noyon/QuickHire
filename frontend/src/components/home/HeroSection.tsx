import Image from "next/image";
import Container from "@/components/layout/Container";
import { Search, MapPin, ChevronDown } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#F8F8FD]">
            <div className="relative z-10">
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
                                <div className="flex flex-col lg:flex-row items-center gap-2 lg:h-[50px]">
                                    {/* 1. Job Input Section */}
                                    <div className="flex flex-1 items-center gap-4 w-full pr-4">
                                        <Search
                                            className="h-6 w-6 text-[#25324B]"
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

                                    {/* 2. Location Section */}
                                    <div className="flex flex-1 items-center gap-4 w-full px-4">
                                        <MapPin
                                            className="h-6 w-6 text-[#25324B]"
                                            strokeWidth={2.5}
                                        />
                                        <div className="flex w-full items-center justify-between border-b-[1.5px] border-[#D6DDEB] py-2 cursor-pointer">
                                            <span className="text-[18px] font-medium text-[#25324B]">
                                                Florence, Italy
                                            </span>
                                            <ChevronDown className="h-5 w-5 text-[#7C8493]" />
                                        </div>
                                    </div>

                                    {/* 4. The "Search my job" Button */}
                                    <button
                                        type="button"
                                        className="w-full lg:w-auto lg:min-w-[210px] h-full bg-[#4640DE] px-10 py-4 lg:py-0 text-[18px] font-bold text-white transition-all hover:bg-[#3b36c0] active:scale-95"
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
                        <div
                            className="relative z-10 w-full max-w-[480px]"
                            style={{
                                clipPath:
                                    "polygon(0 0, 100% 0, 100% 82%, 63% 100%, 0 100%)",
                            }}
                        >
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
            </div>
        </section>
    );
}
