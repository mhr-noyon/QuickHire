import Link from "next/link";
import { Dribbble, Instagram, Linkedin, Twitter } from "lucide-react";

const aboutLinks = [
    { label: "Companies", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Advice", href: "#" },
    { label: "Privacy Policy", href: "#" },
];

const resourceLinks = [
    { label: "Help Docs", href: "#" },
    { label: "Guide", href: "#" },
    { label: "Updates", href: "#" },
    { label: "Contact Us", href: "#" },
];

const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Dribbble, href: "#", label: "Dribbble" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
    return (
        <footer className="font-epilogue bg-[#202430] text-white">
            <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 lg:px-16">
                <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.7fr]">
                    <div className="max-w-sm">
                        <Link href="/" className="mb-6 flex items-center gap-3">
                            <img
                                src="/logo2.svg"
                                alt="QuickHire Logo"
                                className="h-8 w-auto"
                            />
                        </Link>

                        <p className="text-base leading-8 text-[#B8BBC7]">
                            Great platform for the job seeker that passionate
                            about startups. Find your dream job easier.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-6 text-[22px] font-semibold">
                            About
                        </h3>
                        <ul className="space-y-4">
                            {aboutLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-[17px] text-[#B8BBC7] transition hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-[22px] font-semibold">
                            Resources
                        </h3>
                        <ul className="space-y-4">
                            {resourceLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-[17px] text-[#B8BBC7] transition hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="max-w-md">
                        <h3 className="mb-6 text-[22px] font-semibold">
                            Get job notifications
                        </h3>
                        <p className="mb-6 text-[17px] leading-8 text-[#B8BBC7]">
                            The latest job news, articles, sent to your inbox
                            weekly.
                        </p>

                        <form className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="h-14 w-full border border-transparent bg-[#F3F4F6] px-4 text-[16px] text-[#202437] outline-none placeholder:text-[#9CA3AF] focus:border-[#4640DE]"
                            />
                            <button
                                type="submit"
                                className="h-14 min-w-[140px] bg-[#4640DE] px-6 text-[16px] font-semibold text-white transition hover:bg-[#3b35c9]"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="my-12 h-px w-full bg-[#3A3F55]" />

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <p className="text-[16px] text-[#FFFFFF]/40">
                        2021 @ QuickHire. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2E3347] text-[#D1D5DB] transition hover:bg-[#4640DE] hover:text-white"
                            >
                                <Icon size={18} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
