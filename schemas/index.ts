import { ScheduleTypes } from "@/lib/types";
import { z } from "zod";

export const TaskSchema = z.object({
    headline: z.string().max(100).min(1),
    description: z.string().max(300),
    schedule: z.enum([ScheduleTypes.Today, ScheduleTypes.ThisWeek, ScheduleTypes.Tomorrow]),
});
