"use client";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import LogoutButton from "../auth/logout-button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FaUserCircle } from "react-icons/fa";
import { User } from "next-auth";

interface NavBarProps {
    className?: string;
    currentUser?: User;
}

export const NavBar: React.FC<NavBarProps> = ({ className, currentUser }) => {
    return (
        <div className={twMerge("bg-indigo-300", className)}>
            <div className="w-full h-full flex items-center justify-between">
                <Logo></Logo>
                <div className="h-full w-fit mx-6 p-2">
                    <div className="h-full w-full flex items-center justify-center gap-x-4">
                        {currentUser && (
                            <>
                                <div className="flex items-center justify-center text-indigo-700 gap-x-2">
                                    <Avatar>
                                        <AvatarImage
                                            className="h-[35px] w-[35px] rounded-full"
                                            src={currentUser.image || ""}
                                        />
                                        <AvatarFallback>
                                            <FaUserCircle className="border-none" size={35}></FaUserCircle>
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-xl  font-semibold">
                                        <span>{currentUser.name}</span>
                                    </div>
                                </div>
                                <div>
                                    <LogoutButton>
                                        <Button variant="secondary" size="lg" className="text-lg font-semibold">
                                            Logout
                                        </Button>
                                    </LogoutButton>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
