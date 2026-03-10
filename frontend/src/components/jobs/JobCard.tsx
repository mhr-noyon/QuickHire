import Link from "next/link";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { Job } from "@/lib/types";
import { getCategoryStyle } from "@/lib/CategoryStyle";

function timeAgo(dateString: string): string {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateString).toLocaleDateString();
}

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <Link
            href={`/jobs/${job.id}`}
            className="group flex flex-col gap-5 border border-[#D6DDEB] bg-white p-6 transition hover:border-[#4640DE] hover:shadow-sm"
        >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
                {job.logo ? (
                    <img
                        src={job.logo}
                        alt={job.company}
                        className="h-12 w-12 rounded-md object-cover"
                    />
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#F0F0F7] text-[20px] font-bold text-[#4640DE]">
                        {job.company.charAt(0)}
                    </div>
                )}
                <span className="inline-flex h-[36px] items-center border border-[#4640DE] px-3 text-[14px] font-medium text-[#4640DE]">
                    Full Time
                </span>
            </div>

            {/* Title & company */}
            <div>
                <h3 className="text-[18px] font-semibold text-[#25324B] group-hover:text-[#4640DE] transition">
                    {job.title}
                </h3>
                <p className="mt-1 text-[15px] text-[#515B6F]">{job.company}</p>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-[14px] text-[#7C8493]">
                <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" /> {job.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {timeAgo(job.created_at)}
                </span>
            </div>

            {/* Description preview */}
            <p className="line-clamp-2 text-[15px] leading-relaxed text-[#7C8493]">
                {job.description}
            </p>

            {/* Category tag */}
            <div className="mt-auto pt-2">
                {job.category.split(", ").map((cat) => (
                    <span
                        key={cat}
                        className={`inline-flex h-[32px] items-center rounded-full px-4 text-[14px] font-medium ${getCategoryStyle(cat)}`}
                    >
                        {cat}
                    </span>
                ))}
                {/* <span
                    className={`inline-flex h-[32px] items-center rounded-full px-4 text-[14px] font-medium ${getCategoryStyle(job.category)}`}
                >
                    {job.category}
                </span> */}
            </div>
        </Link>
    );
}
