const categoryColors: Record<string, string> = {
    Design: "bg-[#EBF5F4] text-[#56CDAD]",
    Sales: "bg-[#FFF4F1] text-[#FFB836]",
    Marketing: "bg-[#FFF4F1] text-[#FFB836]",
    Finance: "bg-[#EEE8FF] text-[#4640DE]",
    Technology: "bg-[#FFF0F0] text-[#FF6550]",
    Engineering: "bg-[#FFF0F0] text-[#FF6550]",
    Business: "bg-[#EEE8FF] text-[#4640DE]",
    "Human Resource": "bg-[#EBF5F4] text-[#56CDAD]",
};

export function getCategoryStyle(category: string): string {
    return categoryColors[category] || "bg-[#F0F0F7] text-[#515B6F]";
}
