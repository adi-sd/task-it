import { z } from "zod";
import { ScheduleTypes, Task } from "@prisma/client";
import { TaskUpdateSchema } from "@/schemas";

export const EmptyTaskTemplate: z.infer<typeof TaskUpdateSchema> = {
    userId: "",
    headline: "",
    description: "",
    schedule: ScheduleTypes.Today,
    isCompleted: false,
};

export type AuthResponseType = {
    error?: string;
    success?: string;
    twoFactor?: boolean;
};
