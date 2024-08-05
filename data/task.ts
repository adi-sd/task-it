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

export const getTaskById = async (taskId: string) => {
    try {
        const task = await db.task.findUnique({
            where: {
                id: taskId,
            },
        });
        return task;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addNewTask = async (task: Task) => {
    try {
        const newTask = await db.task.create({ data: task });
        return newTask;
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
        const updatedTask = await db.task.update({
            where: { id: existingTask.id },
            data: {
                ...values,
            },
        });
        return updatedTask;
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

export const updateTaskSchedule = async (taskId: string, type: ScheduleTypes) => {
    try {
        const existingTask = await db.task.findUnique({
            where: {
                id: taskId,
            },
        });
        if (!existingTask) {
            throw new Error("Task Not Found with given ID");
        }
        const updatedTask = await db.task.update({
            where: { id: existingTask.id },
            data: {
                schedule: type,
            },
        });
        return updatedTask;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
