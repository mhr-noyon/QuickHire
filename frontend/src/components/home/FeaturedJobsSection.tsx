import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";

const featuredJobs = [
    {
        id: 1,
        company: "Revolut",
        location: "Madrid, Spain",
        title: "Email Marketing",
        description:
            "Revolut is looking for an Email Marketing Specialist to help the marketing team create engaging campaigns and improve customer retention.",
        type: "Full Time",
        logo: "/featuredJobs/BvBoaEET.png",
        tags: [
            { label: "Marketing", color: "orange" },
            { label: "Design", color: "green" },
        ],
    },
    {
        id: 2,
        company: "Dropbox",
        location: "San Fransisco, US",
        title: "Brand Designer",
        description:
            "Dropbox is looking for a Brand Designer to help the team build strong visual identities and deliver consistent brand experiences.",
        type: "Full Time",
        logo: "/featuredJobs/dropbox.png",
        tags: [
            { label: "Design", color: "green" },
            { label: "Business", color: "purple" },
        ],
    },
    {
        id: 3,
        company: "Pitch",
        location: "Berlin, Germany",
        title: "Email Marketing",
        description:
            "Pitch is looking for an Email Marketing Manager to join the marketing team and create campaigns that drive user engagement and growth.",
        type: "Full Time",
        logo: "/featuredJobs/pitch.png",
        tags: [{ label: "Marketing", color: "orange" }],
    },
    {
        id: 4,
        company: "Blinkist",
        location: "Granada, Spain",
        title: "Visual Designer",
        description:
            "Blinkist is looking for a Visual Designer to help the team design compelling visuals and improve the overall brand presence.",
        type: "Full Time",
        logo: "/featuredJobs/blinkist.png",
        tags: [{ label: "Design", color: "green" }],
    },
    {
        id: 5,
        company: "ClassPass",
        location: "Manchester, UK",
        title: "Product Designer",
        description:
            "ClassPass is looking for a Product Designer to help create intuitive user experiences and improve the usability of its digital products.",
        type: "Full Time",
        logo: "/featuredJobs/classpass.png",
        tags: [
            { label: "Marketing", color: "orange" },
            { label: "Design", color: "green" },
        ],
    },
    {
        id: 6,
        company: "Canva",
        location: "Ontario, Canada",
        title: "Lead Designer",
        description:
            "Canva is looking for a Lead Designer to help guide the creative team and shape user-focused design solutions across the platform.",
        type: "Full Time",
        logo: "/featuredJobs/canva.png",
        tags: [
            { label: "Design", color: "green" },
            { label: "Business", color: "purple" },
        ],
    },
    {
        id: 7,
        company: "GoDaddy",
        location: "Marseille, France",
        title: "Brand Strategist",
        description:
            "GoDaddy is looking for a Brand Strategist to join the team and develop effective brand positioning and long-term communication strategies.",
        type: "Full Time",
        logo: "/featuredJobs/godaddy.png",
        tags: [{ label: "Marketing", color: "orange" }],
    },
    {
        id: 8,
        company: "Twitter",
        location: "San Diego, US",
        title: "Data Analyst",
        description:
            "Twitter is looking for a Data Analyst to help the team uncover insights, measure performance, and support data-driven decisions.",
        type: "Full Time",
        logo: "/featuredJobs/twitter.png",
        tags: [{ label: "Technology", color: "red" }],
    },
];
const tagStyles: Record<string, string> = {
    orange: "bg-[#FFF4F1] text-[#FFB836]",
    green: "bg-[#EBF5F4] text-[#56CDAD]",
    purple: "bg-[#EEE8FF] text-[#4640DE]",
    red: "bg-[#FFF0F0] text-[#FF6550]",
};

export default function FeaturedJobsSection() {
    return (
        <section className="bg-[#FFFFFF] py-20 lg:py-24">
            <Container>
                <div className="flex items-center justify-between gap-6">
                    <h2
                        className="text-[40px] font-semibold leading-none tracking-[-0.02em] text-[#25324B] md:text-[48px]"
                        style={{ fontFamily: "ClashDisplay, sans-serif" }}
                    >
                        Featured <span className="text-[#26A4FF]">jobs</span>
                    </h2>

                    <Link
                        href="/jobs"
                        className="inline-flex items-center gap-3 text-[20px] font-semibold text-[#4640DE] hover:opacity-80"
                    >
                        Show all jobs
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {featuredJobs.map((job) => (
                        <article
                            key={job.id}
                            className="flex h-full cursor-pointer flex-col border border-[#D6DDEB] bg-white p-6 transition hover:border-[#4640DE] hover:shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <Image
                                    src={job.logo}
                                    alt={job.company}
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 object-contain"
                                />

                                <span className="inline-flex h-[42px] items-center justify-center border border-[#4640DE] px-4 text-[18px] font-medium text-[#4640DE]">
                                    {job.type}
                                </span>
                            </div>

                            <div className="mt-8 flex flex-1 flex-col">
                                <h3 className="text-[18px] font-semibold text-[#25324B]">
                                    {job.title}
                                </h3>

                                <p className="mt-2 min-h-[56px] text-[18px] leading-[1.5] text-[#515B6F]">
                                    {job.company}{" "}
                                    <span className="mx-1">•</span>{" "}
                                    {job.location}
                                </p>

                                <p className="mt-6 h-[86px] overflow-hidden text-[18px] leading-[1.6] text-[#7C8493]">
                                    {job.description.length < 80
                                        ? job.description
                                        : job.description.slice(0, 80) + "..."}
                                </p>

                                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                                    {job.tags.map((tag) => (
                                        <span
                                            key={tag.label}
                                            className={`inline-flex h-[34px] items-center rounded-full px-4 text-[16px] font-medium ${tagStyles[tag.color]}`}
                                        >
                                            {tag.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}
