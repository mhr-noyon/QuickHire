"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { Job } from "@/lib/types";
import { getCategoryStyle } from "@/lib/CategoryStyle";
import JobCard from "../jobs/JobCard";
import { fetchFeaturedJobs } from "@/lib/api";

// const featuredJobs = [
//     {
//         id: 1,
//         company: "Revolut",
//         location: "Madrid, Spain",
//         title: "Email Marketing",
//         description:
//             "Revolut is looking for an Email Marketing Specialist to help the marketing team create engaging campaigns and improve customer retention.",
//         type: "Full Time",
//         logo: "/featuredJobs/BvBoaEET.png",
//         tags: [
//             { label: "Marketing", color: "orange" },
//             { label: "Design", color: "green" },
//         ],
//     },
//     {
//         id: 2,
//         company: "Dropbox",
//         location: "San Fransisco, US",
//         title: "Brand Designer",
//         description:
//             "Dropbox is looking for a Brand Designer to help the team build strong visual identities and deliver consistent brand experiences.",
//         type: "Full Time",
//         logo: "/featuredJobs/dropbox.png",
//         tags: [
//             { label: "Design", color: "green" },
//             { label: "Business", color: "purple" },
//         ],
//     },
//     {
//         id: 3,
//         company: "Pitch",
//         location: "Berlin, Germany",
//         title: "Email Marketing",
//         description:
//             "Pitch is looking for an Email Marketing Manager to join the marketing team and create campaigns that drive user engagement and growth.",
//         type: "Full Time",
//         logo: "/featuredJobs/pitch.png",
//         tags: [{ label: "Marketing", color: "orange" }],
//     },
//     {
//         id: 4,
//         company: "Blinkist",
//         location: "Granada, Spain",
//         title: "Visual Designer",
//         description:
//             "Blinkist is looking for a Visual Designer to help the team design compelling visuals and improve the overall brand presence.",
//         type: "Full Time",
//         logo: "/featuredJobs/blinkist.png",
//         tags: [{ label: "Design", color: "green" }],
//     },
//     {
//         id: 5,
//         company: "ClassPass",
//         location: "Manchester, UK",
//         title: "Product Designer",
//         description:
//             "ClassPass is looking for a Product Designer to help create intuitive user experiences and improve the usability of its digital products.",
//         type: "Full Time",
//         logo: "/featuredJobs/classpass.png",
//         tags: [
//             { label: "Marketing", color: "orange" },
//             { label: "Design", color: "green" },
//         ],
//     },
//     {
//         id: 6,
//         company: "Canva",
//         location: "Ontario, Canada",
//         title: "Lead Designer",
//         description:
//             "Canva is looking for a Lead Designer to help guide the creative team and shape user-focused design solutions across the platform.",
//         type: "Full Time",
//         logo: "/featuredJobs/canva.png",
//         tags: [
//             { label: "Design", color: "green" },
//             { label: "Business", color: "purple" },
//         ],
//     },
//     {
//         id: 7,
//         company: "GoDaddy",
//         location: "Marseille, France",
//         title: "Brand Strategist",
//         description:
//             "GoDaddy is looking for a Brand Strategist to join the team and develop effective brand positioning and long-term communication strategies.",
//         type: "Full Time",
//         logo: "/featuredJobs/godaddy.png",
//         tags: [{ label: "Marketing", color: "orange" }],
//     },
//     {
//         id: 8,
//         company: "Twitter",
//         location: "San Diego, US",
//         title: "Data Analyst",
//         description:
//             "Twitter is looking for a Data Analyst to help the team uncover insights, measure performance, and support data-driven decisions.",
//         type: "Full Time",
//         logo: "/featuredJobs/twitter.png",
//         tags: [{ label: "Technology", color: "red" }],
//     },
// ];
// const tagStyles: Record<string, string> = {
//     orange: "bg-[#FFF4F1] text-[#FFB836]",
//     green: "bg-[#EBF5F4] text-[#56CDAD]",
//     purple: "bg-[#EEE8FF] text-[#4640DE]",
//     red: "bg-[#FFF0F0] text-[#FF6550]",
// };

export default function FeaturedJobsSection() {
    const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);

    useEffect(() => {
        fetchFeaturedJobs({ limit: 8, featured: true })
            .then((data) => {
                console.log("Fetched featured jobs:", data);
                setFeaturedJobs(data);
            })
            .catch((err) => {
                console.error("Error fetching featured jobs:", err);
            });
    }, []);

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
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
