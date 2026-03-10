import Image from "next/image";
import Link from "next/link";

const navLinks = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Browse Companies", href: "/companies" },
];

export default function Header() {
    return (
        <header className="w-full bg-[#F8F8FD] text-[#25324B]">
            <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6  lg:px-16">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/Logo1.svg"
                            alt="QuickHire Logo"
                            width={160}
                            height={32}
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-[16px] font-medium text-[#515B6F] transition hover:text-[#25324B]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center">
                    <Link
                        href="/login"
                        className="px-6 text-[16px] font-semibold text-[#4640DE] transition hover:opacity-80"
                    >
                        Login
                    </Link>

                    <div className="mx-1 hidden h-10 w-px bg-[#D6DDEB] md:block" />

                    <Link
                        href="/signup"
                        className="ml-3 inline-flex h-[42px] items-center justify-center bg-[#4640DE] px-7 text-[16px] font-semibold text-white transition hover:bg-[#3d37c9]"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
}
