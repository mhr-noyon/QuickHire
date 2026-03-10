import Image from "next/image";
import Container from "@/components/layout/Container";
import HeroSection from "@/components/home/HeroSection";
import CompaniesSection from "@/components/home/CompaniesSection";
import CategorySection from "@/components/home/CategorySection";

export default function Home() {
    return (
        <Container>
            <section className="relative overflow-hidden bg-[#F8F8FD]">
                <div className="pointer-events-none absolute top-0 right-0 z-10">
                    <Image
                        src="/pattern.svg"
                        alt=""
                        width={860}
                        height={794}
                        priority
                        className="h-auto w-[1020px] max-w-none lg:w-[1040px] xl:w-[1050px]"
                    />
                </div>

                <HeroSection />
            </section>

            <CompaniesSection />
            <CategorySection />
        </Container>
    );
}
