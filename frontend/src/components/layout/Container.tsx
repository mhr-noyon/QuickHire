import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string;
};

export default function Container({
    children,
    className = "",
}: ContainerProps) {
    return (
        <div
            className={`font-epilogue mx-auto w-full max-w-[1400px] px-6 lg:px-16 ${className}`}
        >
            {children}
        </div>
    );
}
