"use client";

import { toast } from "sonner";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
    const onClick = async () => {
        await logout()
            .then(() => {
                toast.success("Logged out successfully!");
            })
            .catch(() => {
                toast.error("Failed to logout!");
            });
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};

export default LogoutButton;
