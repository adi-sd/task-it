"use client";

import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";

import { EditTask } from "./edit-task";
import { Task } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

interface TaskDialogProps {
    children: React.ReactNode;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogOverlay className="bg-white/0 backdrop-blur-sm"></DialogOverlay>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <div className={twMerge("flex flex-col gap-y-4 h-[600px] w-[500px] bg-white/90 p-6 rounded-lg")}>
                    <div className="px-4 py-2">
                        <span className="font-bold text-lg">Add a New Task...</span>
                    </div>
                    <EditTask isDialog setOpen={setOpen}></EditTask>
                </div>
            </DialogContent>
        </Dialog>
    );
};
