import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b border-border bg-surface">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="text-xl font-bold text-primary-600">
                    QuickHire
                </Link>

                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link
                        href="/"
                        className="text-muted hover:text-foreground transition-colors"
                    >
                        Jobs
                    </Link>
                    <Link
                        href="/admin"
                        className="text-muted hover:text-foreground transition-colors"
                    >
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    );
}
