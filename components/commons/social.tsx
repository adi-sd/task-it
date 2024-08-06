"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSpotify } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AUTHENTICATED_USER_REDIRECT } from "@/routes";

export const Social = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "";

    const onClick = (provider: "google") => {
        signIn(provider, {
            callbackUrl: callbackUrl || AUTHENTICATED_USER_REDIRECT,
        });
    };

    return (
        <div className="flex flex-col items-center w-full gap-y-5">
            <div>
                <span className="text-sm font-mono font-semibold">or</span>
            </div>
            <div className="w-full">
                <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")}>
                    <FcGoogle className="h-5 w-5"></FcGoogle>
                </Button>
            </div>
        </div>
    );
};
