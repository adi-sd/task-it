"use client";
import { twMerge } from "tailwind-merge";
import { User } from "next-auth";
import { FaUserCircle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

import { Logo } from "@/components/commons/logo";
import LogoutButton from "@/components/auth/logout-button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface NavBarProps {
    className?: string;
    currentUser?: User;
}

export const NavBar: React.FC<NavBarProps> = ({ className, currentUser }) => {
    return (
        <div className={twMerge("bg-indigo-300 font-mono", className)}>
            <div className="w-full h-full flex items-center justify-between">
                <Logo enableLink enableIcon></Logo>
                <div className="h-full w-fit flex items-center justify-center gap-x-4 mx-6 p-2 hover:bg-white/50">
                    {currentUser && (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="p-2">
                                    <div className="flex items-center justify-center text-indigo-700 gap-x-2 ">
                                        <Avatar>
                                            <AvatarImage
                                                className="h-[35px] w-[35px] rounded-full"
                                                src={currentUser.image || ""}
                                            />
                                            <AvatarFallback>
                                                <FaUserCircle className="border-none" size={35}></FaUserCircle>
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-xl font-semibold">
                                            <span>{currentUser.name}</span>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-2">
                                    <DropdownMenuLabel className="text-xl font-bold font-mono mx-4">
                                        Account Details :
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="mx-4 flex gap-x-2 items-center justify-start">
                                        <LogoutButton>
                                            <span className="text-lg font-mono">{currentUser.email}</span>
                                        </LogoutButton>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="mx-4 flex gap-x-2 items-center justify-start">
                                        <IoMdExit size={25}></IoMdExit>
                                        <LogoutButton>
                                            <span className="text-lg font-mono">Logout</span>
                                        </LogoutButton>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
