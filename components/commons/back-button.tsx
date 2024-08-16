"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
    label: string;
    href: string;
    disableLink?: boolean;
    handleOnClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ label, href, disableLink, handleOnClick }) => {
    if (disableLink) {
        return (
            <Button variant="link" className="font-normal w-full" size="sm" onClick={handleOnClick}>
                <span>{label}</span>
            </Button>
        );
    }
    return (
        <Button variant="link" className="font-normal w-full" size="sm">
            <Link href={href}>{label}</Link>
        </Button>
    );
};

export default BackButton;
