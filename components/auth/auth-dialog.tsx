"use client";

import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { useState } from "react";

interface AuthDialogProps {
    children: React.ReactNode;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true);

    const switchLoginOrRegister = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Dialog>
            <DialogOverlay className="bg-white/0 backdrop-blur-sm"></DialogOverlay>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none" aria-describedby={undefined}>
                <DialogTitle hidden></DialogTitle>
                {isLogin ? (
                    <LoginForm handleSwitchToRegister={switchLoginOrRegister}></LoginForm>
                ) : (
                    <RegisterForm handleSwitchToLogin={switchLoginOrRegister}></RegisterForm>
                )}
            </DialogContent>
        </Dialog>
    );
};
