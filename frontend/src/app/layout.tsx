import type { Metadata } from "next";
import { Geist, Geist_Mono, Epilogue } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const epilogue = Epilogue({
    variable: "--font-epilogue",
    subsets: ["latin"],
});
const clashDisplay = localFont({
    src: [
        {
            path: "../fonts/ClashDisplay-Semibold.otf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../fonts/ClashDisplay-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-clash-display",
});

export const metadata: Metadata = {
    title: "QuickHire — Job Board",
    description: "Browse jobs, apply instantly, and hire quickly.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} ${clashDisplay.variable} antialiased flex min-h-screen flex-col`}
            >
                <Header />
                <main className="mt-[72px] flex-1 ">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
