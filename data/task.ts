"use server";

import z from "zod";

import { db } from "@/lib/db";
import { TaskUpdateSchema } from "@/schemas";
import { ScheduleTypes, Task } from "@prisma/client";

export const getAllTasks = async () => {
    try {
        const tasks = await db.task.findMany();
        return tasks;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllTasksOfType = async (type: ScheduleTypes) => {
    try {
        const tasks = await db.task.findMany({
            where: {
                schedule: type,
            },
        });
        return tasks;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addTask = async (task: Task) => {
    try {
        await db.task.create({ data: task });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateTask = async (values: z.infer<typeof TaskUpdateSchema>) => {
    try {
        const existingTask = await db.task.findUnique({
            where: {
                id: values.id,
            },
        });
        if (!existingTask) {
            throw new Error("Task Not Found with given ID");
        }
        await db.task.update({
            where: { id: existingTask.id },
            data: {
                ...values,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteTaskById = async (id: string) => {
    try {
        const tasks = await db.task.delete({
            where: {
                id,
            },
        });
        return tasks;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
