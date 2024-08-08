import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface LogoProps {
    className?: string;
    enableLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, enableLink }) => {
    const user = useCurrentUser();
    const router = useRouter();

    const handleLogoClick = () => {
        if (enableLink) {
            if (user) {
                router.push("/home");
            } else {
                router.push("/");
            }
        }
    };

    return (
        <div
            className={twMerge(
                "h-full w-fit text-3xl font-mono font-extrabold text-indigo-700 mx-6 p-4 my-0 hover:bg-white/50 flex items-center justify-center",
                className
            )}
            onClick={handleLogoClick}
        >
            task-it
        </div>
    );
};
