import { z } from "zod";
import { TaskListTypes } from "@prisma/client";
import { TaskUpdateSchema } from "@/schemas";

export const EmptyTaskTemplate: z.infer<typeof TaskUpdateSchema> = {
    userId: "",
    headline: "",
    description: "",
    currentListType: TaskListTypes.Today,
    oldListType: TaskListTypes.Today,
    isCompleted: false,
    isDeleted: false,
};

export type AuthResponseType = {
    error?: string;
    success?: string;
    twoFactor?: boolean;
};

export type TaskViewType = "edit" | "display";
