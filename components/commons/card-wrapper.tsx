"use client";

import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Header } from "@/components/commons/header";
import { Social } from "@/components/commons/social";
import BackButton from "@/components/commons/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    backButtonOnclick?: () => void;
    showSocial?: boolean;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    backButtonOnclick,
    showSocial = false,
}) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}></Header>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social></Social>
                </CardFooter>
            )}
            <CardFooter>
                {backButtonOnclick ? (
                    <BackButton
                        label={backButtonLabel}
                        href={backButtonHref}
                        disableLink
                        handleOnClick={backButtonOnclick}
                    ></BackButton>
                ) : (
                    <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
                )}
            </CardFooter>
        </Card>
    );
};
