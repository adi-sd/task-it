import { ScheduleTypes } from "@prisma/client";
import { z } from "zod";

export const TaskUpdateSchema = z.object({
    id: z.optional(z.string()),
    headline: z.string().max(100).min(1, {
        message: "Headline is required!",
    }),
    description: z.string().max(300, {
        message: "Maximum character limit (300) reached!",
    }),
    schedule: z.enum([ScheduleTypes.Today, ScheduleTypes.ThisWeek, ScheduleTypes.Tomorrow]),
    isCompleted: z.optional(z.boolean()),
});
