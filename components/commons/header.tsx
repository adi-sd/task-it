import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface HeaderProps {
    label: string;
}

export const Header: React.FC<HeaderProps> = ({ label }) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <Logo></Logo>
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    );
};
