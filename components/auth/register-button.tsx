"use client";

import React from "react";

import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import RegisterForm from "./register-form";

interface RegisterButtonProps {
    children: React.ReactNode;
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ children }) => {
    return (
        <Dialog>
            <DialogOverlay className="bg-white/0 backdrop-blur-sm"></DialogOverlay>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <RegisterForm></RegisterForm>
            </DialogContent>
        </Dialog>
    );
};
