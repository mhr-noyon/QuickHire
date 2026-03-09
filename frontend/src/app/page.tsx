import Container from "@/components/layout/Container";

export default function Home() {
    return (
        <Container>
            <section className="py-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    Find Your Next Opportunity
                </h1>
                <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
                    Browse open positions, filter by category or location, and
                    apply in seconds.
                </p>
            </section>

            {/* Job listings will go here */}
            <section className="py-8">
                <p className="text-center text-muted">
                    Job listings coming soon.
                </p>
            </section>
        </Container>
    );
}
