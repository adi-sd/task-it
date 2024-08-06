"use client";

import React from "react";

import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/login-form";

interface LoginButtonProps {
    children: React.ReactNode;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ children }) => {
    return (
        <Dialog>
            <DialogOverlay className="bg-white/0 backdrop-blur-sm"></DialogOverlay>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <LoginForm></LoginForm>
            </DialogContent>
        </Dialog>
    );
};
