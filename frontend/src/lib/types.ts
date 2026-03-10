export interface Job {
    id: number;
    title: string;
    company: string;
    logo: string | null;
    location: string;
    category: string;
    description: string;
    created_at: string;
}

export interface Application {
    id: number;
    job_id: number;
    name: string;
    email: string;
    resume_link: string;
    cover_note: string;
    created_at: string;
}
