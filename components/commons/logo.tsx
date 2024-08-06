import { twMerge } from "tailwind-merge";

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return <div className={twMerge("text-3xl font-mono font-extrabold text-indigo-700 mx-6", className)}>task-it</div>;
};
