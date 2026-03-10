import Image from "next/image";
import Container from "@/components/layout/Container";

export default function PostJobsSection() {
    return (
        <section className="bg-[#FFFFFF] py-20 lg:py-24">
            <Container>
                <div
                    className="relative overflow-hidden bg-[#4640DE] px-8 py-12 md:px-12 lg:px-16 lg:py-0"
                    style={{
                        clipPath:
                            "polygon(10% 0, 100% 0, 100% 78%, 88% 100%, 0 100%, 0 14%)",
                    }}
                >
                    <div className="grid min-h-[440px] items-center gap-10 lg:grid-cols-[420px_1fr]">
                        <div className="relative z-10 max-w-[360px] py-10 lg:py-0">
                            <h2
                                className="text-[48px] font-semibold leading-[0.95] tracking-[-0.03em] text-white md:text-[56px]"
                                style={{
                                    fontFamily: "ClashDisplay, sans-serif",
                                }}
                            >
                                Start posting
                                <br />
                                jobs today
                            </h2>

                            <p className="mt-8 text-[22px] leading-[1.5] text-white/90">
                                Start posting jobs for only $10.
                            </p>

                            <button
                                type="button"
                                className="cursor-pointer mt-10 inline-flex h-[56px] items-center justify-center bg-white px-8 text-[20px] font-semibold text-[#4640DE] transition hover:bg-[#e1e2e4]"
                            >
                                Sign Up For Free
                            </button>
                        </div>

                        <div className="relative hidden min-h-[440px] lg:flex lg:items-end lg:justify-end">
                            <div className="relative z-10 w-full max-w-[700px]">
                                <Image
                                    src="/DashboardCompany.svg"
                                    alt="Dashboard preview"
                                    width={760}
                                    height={520}
                                    className="h-auto w-full object-contain object-bottom"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
