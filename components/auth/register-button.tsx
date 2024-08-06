"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "./register-form";

interface RegisterButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ children, mode = "redirect", asChild }) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/register");
    };

    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <RegisterForm></RegisterForm>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div onClick={onClick} className="cursor-pointer">
            {children}
        </div>
    );
};
