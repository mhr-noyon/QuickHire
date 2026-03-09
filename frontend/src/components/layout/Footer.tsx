export default function Footer() {
    return (
        <footer className="border-t border-border bg-surface py-8 mt-auto">
            <div className="container text-center text-sm text-muted">
                &copy; {new Date().getFullYear()} QuickHire. All rights
                reserved.
            </div>
        </footer>
    );
}
