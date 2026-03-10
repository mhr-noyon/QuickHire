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
import Container from "@/components/layout/Container";

const categories = [
    {
        title: "Design",
        jobs: 235,
        icon: Palette,
    },
    {
        title: "Sales",
        jobs: 756,
        icon: ChartNoAxesColumn,
    },
    {
        title: "Marketing",
        jobs: 140,
        icon: Megaphone,
    },
    {
        title: "Finance",
        jobs: 325,
        icon: Wallet,
    },
    {
        title: "Technology",
        jobs: 436,
        icon: Monitor,
    },
    {
        title: "Engineering",
        jobs: 542,
        icon: CodeXml,
    },
    {
        title: "Business",
        jobs: 211,
        icon: BriefcaseBusiness,
    },
    {
        title: "Human Resource",
        jobs: 346,
        icon: Users,
    },
];

export default function CategorySection() {
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
                                                {category.jobs} jobs available
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
