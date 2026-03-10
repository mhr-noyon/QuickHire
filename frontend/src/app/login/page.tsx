"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { adminLogin } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true);
        try {
            const { token } = await adminLogin(username, password);
            localStorage.setItem("admin_token", token);
            router.push("/admin");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Login failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-[#F8F8FD]">
            <div className="w-full max-w-[420px] border border-[#D6DDEB] bg-white p-8">
                <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F0F7]">
                        <Lock className="h-5 w-5 text-[#4640DE]" />
                    </div>
                    <h1
                        className="mt-4 text-[28px] font-semibold text-[#25324B]"
                        style={{ fontFamily: "ClashDisplay, sans-serif" }}
                    >
                        Admin <span className="text-[#4640DE]">Login</span>
                    </h1>
                    <p className="mt-1 text-[15px] text-[#7C8493]">
                        Sign in to manage job listings
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-[14px] text-red-600">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="h-11 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-[14px] font-medium text-[#25324B]">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="h-11 w-full border border-[#D6DDEB] bg-white px-4 text-[15px] text-[#25324B] outline-none placeholder:text-[#A8ADB7] focus:border-[#4640DE]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 bg-[#4640DE] text-[15px] font-semibold text-white transition hover:bg-[#3b35c9] disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
