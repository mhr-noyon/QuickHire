import Container from "@/components/layout/Container";

interface JobDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
    const { id } = await params;

    return (
        <Container>
            <h1 className="text-3xl font-bold tracking-tight">Job #{id}</h1>
            <p className="mt-2 text-muted">
                Full job details and application form will appear here.
            </p>
        </Container>
    );
}
