"use client";
import Link from "next/link";
import {
    ArrowRight,
    BriefcaseBusiness,
    ChartNoAxesColumn,
    CodeXml,
    Megaphone,
    Monitor,
    Palette,
    Users,
    Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { fetchJobCountByCategory } from "@/lib/api";

const categories = [
    { title: "Design", icon: Palette, jobs: 0 },
    { title: "Sales", icon: ChartNoAxesColumn, jobs: 0 },
    { title: "Marketing", icon: Megaphone, jobs: 0 },
    { title: "Finance", icon: Wallet, jobs: 0 },
    { title: "Technology", icon: Monitor, jobs: 0 },
    { title: "Engineering", icon: CodeXml, jobs: 0 },
    { title: "Business", icon: BriefcaseBusiness, jobs: 0 },
    { title: "Human Resource", icon: Users, jobs: 0 },
];

export default function CategorySection() {
    // get job counts for each category from backend
    const fetchJobCounts = async () => {
        const counts = await Promise.all(
            categories.map(async (category) => {
                const { count } = await fetchJobCountByCategory(category.title);
                return { ...category, jobs: count };
            }),
        );
        return counts;
    };

    const [jobCounts, setJobCounts] = useState<typeof categories>(categories);

    useEffect(() => {
        fetchJobCounts().then(setJobCounts);
    }, []);

    return (
        <section className="bg-[#FFFFFF] py-20 lg:py-24">
            <Container>
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <h2
                        className="text-[40px] font-semibold leading-none tracking-[-0.02em] text-[#25324B] md:text-[48px]"
                        style={{ fontFamily: "ClashDisplay, sans-serif" }}
                    >
                        Explore by{" "}
                        <span className="text-[#26A4FF]">category</span>
                    </h2>

                    <Link
                        href="/jobs"
                        className="inline-flex items-center gap-3 text-[20px] font-semibold text-[#4640DE] transition hover:opacity-80"
                    >
                        Show all jobs
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.title}
                                href={`/jobs?category=${encodeURIComponent(category.title)}`}
                                className="group border border-[#D6DDEB] bg-white p-8 transition hover:border-[#4640DE] hover:bg-[#4640DE]"
                            >
                                <div className="flex min-h-[180px] flex-col">
                                    <Icon
                                        className="h-12 w-12 text-[#4640DE] transition group-hover:text-white"
                                        strokeWidth={1.8}
                                    />

                                    <div className="mt-8">
                                        <h3
                                            className="text-[24px] font-semibold leading-none tracking-[-0.02em] text-[#25324B] transition group-hover:text-white"
                                            style={{
                                                fontFamily:
                                                    "ClashDisplay, sans-serif",
                                            }}
                                        >
                                            {category.title}
                                        </h3>

                                        <div className="mt-5 flex items-center justify-between gap-4">
                                            <p className="text-[18px] text-[#7C8493] transition group-hover:text-white/90">
                                                {jobCounts.find(
                                                    (c) =>
                                                        c.title ===
                                                        category.title,
                                                )?.jobs || 0}{" "}
                                                jobs available
                                            </p>

                                            <ArrowRight
                                                className="h-6 w-6 text-[#25324B] transition group-hover:text-white"
                                                strokeWidth={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
