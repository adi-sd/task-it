import { ScheduleTypes } from "@/lib/types";
import * as z from "zod";

export const TaskSchema = z.object({
    headline: z.string().max(200).min(1),
    description: z.string().max(500),
    schedule: z.enum(Object.values(ScheduleTypes).map((type) => type.toString())),
});
