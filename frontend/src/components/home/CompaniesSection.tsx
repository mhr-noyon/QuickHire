import Image from "next/image";
import Container from "@/components/layout/Container";

const companies = [
    {
        name: "Vodafone",
        logo: "/company/vodafone-2017-logo.png",
        width: 166,
        height: 48,
    },
    { name: "Intel", logo: "/company/intel-3.png", width: 120, height: 48 },
    { name: "Tesla", logo: "/company/tesla-9.png", width: 183, height: 48 },
    { name: "AMD", logo: "/company/amd-logo-1.png", width: 151, height: 48 },
    { name: "Talkit", logo: "/company/talkit.png", width: 140, height: 48 },
];

export default function CompaniesSection() {
    return (
        <section className="bg-[#F8F8FD] pb-20 pt-6 z-50"> 
            <span>
                <p className="mb-10 text-left text-[18px] font-normal leading-[1.4] text-[#202430]/40">
                    Companies we helped grow
                </p>

                <div className="flex flex-wrap items-center justify-between gap-y-8">
                    {companies.map((company) => (
                        <div
                            key={company.name}
                            className="flex h-[48px] items-center opacity-40"
                        >
                            <Image
                                src={company.logo}
                                alt={company.name}
                                width={company.width}
                                height={company.height}
                                className="h-auto w-auto max-h-[40px]"
                            />
                        </div>
                    ))}
                </div>
            </span>
        </section>
    );
}
