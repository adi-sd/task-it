import { TaskListTypes } from "@prisma/client";
import { z } from "zod";

export const TaskUpdateSchema = z.object({
    id: z.optional(z.string()),
    userId: z.optional(z.string()),
    headline: z.string().max(100).min(1, {
        message: "Headline is required!",
    }),
    description: z.string().max(300, {
        message: "Maximum character limit (300) reached!",
    }),
    schedule: z.optional(z.enum([TaskListTypes.Today, TaskListTypes.ThisWeek, TaskListTypes.Tomorrow])),
    currentListType: z.enum([
        TaskListTypes.Today,
        TaskListTypes.ThisWeek,
        TaskListTypes.Tomorrow,
        TaskListTypes.Completed,
        TaskListTypes.Deleted,
    ]),
    oldListType: z.enum([
        TaskListTypes.Today,
        TaskListTypes.ThisWeek,
        TaskListTypes.Tomorrow,
        TaskListTypes.Completed,
        TaskListTypes.Deleted,
    ]),
    isCompleted: z.optional(z.boolean()),
    isDeleted: z.optional(z.boolean()),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Password is required",
    }),
    code: z.optional(
        z.string().length(6, {
            message: "Two Factor Code is required!",
        })
    ),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, { message: "Name is required" }),
});
