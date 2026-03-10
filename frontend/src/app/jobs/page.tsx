import { Suspense } from "react";
import JobListings from "@/components/jobs/JobListings";

export const metadata = {
    title: "Find Jobs — QuickHire",
    description:
        "Browse open positions, search and filter by category or location.",
};

export default function JobsPage() {
    return (
        <Suspense>
            <JobListings />
        </Suspense>
    );
}
