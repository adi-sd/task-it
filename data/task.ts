"use server";

import z from "zod";

import { db } from "@/lib/db";
import { TaskUpdateSchema } from "@/schemas";
import { ScheduleTypes, Task } from "@prisma/client";
import { use } from "react";

export const getAllTasks = async (userId: string) => {
    try {
        const tasks = await db.task.findMany({
            where: {
                userId: userId,
            },
        });
        return tasks;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllTasksOfType = async (type: ScheduleTypes, userId: string) => {
    try {
        const tasks = await db.task.findMany({
            where: {
                schedule: type,
                userId: userId,
            },
        });
        return tasks;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getTaskById = async (taskId: string, userId: string) => {
    try {
        const task = await db.task.findUnique({
            where: {
                id: taskId,
                userId: userId,
            },
        });
        return task;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addNewTask = async (task: Task, userId: string) => {
    try {
        const newTask = await db.task.create({ data: { ...task, userId: userId } });
        return newTask;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateTask = async (values: z.infer<typeof TaskUpdateSchema>, userId: string) => {
    try {
        const existingTask = await db.task.findUnique({
            where: {
                id: values.id,
                userId: userId,
            },
        });
        if (!existingTask) {
            throw new Error("Task Not Found with given ID or User ID");
        }
        const updatedTask = await db.task.update({
            where: { id: existingTask.id },
            data: {
                ...values,
            },
        });
        console.log("Task Update Done - ", updatedTask);
        return updatedTask;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteTaskById = async (id: string, userId: string) => {
    try {
        const tasks = await db.task.delete({
            where: {
                id,
                userId,
            },
        });
        return tasks;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateTaskSchedule = async (taskId: string, userId: string, type: ScheduleTypes) => {
    try {
        const existingTask = await db.task.findUnique({
            where: {
                id: taskId,
                userId: userId,
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
