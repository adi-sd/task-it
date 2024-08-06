import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface NavBarProps {
    className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ className }) => {
    return (
        <div className={twMerge("bg-indigo-300 text-indigo-700", className)}>
            <div className="w-full h-full flex items-center justify-between">
                <div className="text-3xl font-mono font-extrabold mx-6">task-it</div>
                <div className="h-full w-fit mx-6 p-2">
                    <div className="h-full w-full flex items-center justify-center gap-x-2">
                        <div className="text-xl font-semibold">User Profile</div>
                        <Avatar>
                            <AvatarImage className="h-[50px] w-[50px] rounded-full" src="xxxxx" />
                            <AvatarFallback>
                                <FaUserCircle className="border-none" size={50}></FaUserCircle>
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </div>
    );
};
