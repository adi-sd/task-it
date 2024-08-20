"use server";

import z from "zod";

import { db } from "@/lib/db";
import { TaskUpdateSchema } from "@/schemas";
import { TaskListTypes, Task } from "@prisma/client";

export const getAllTasksDB = async (userId: string) => {
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

export const getAllTasksOfTypeDB = async (listType: TaskListTypes, userId: string) => {
    try {
        const tasks = await db.task.findMany({
            where: {
                currentListType: listType,
                userId: userId,
            },
        });
        return tasks;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getTaskByIdDB = async (taskId: string, userId: string) => {
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

export const addNewTaskDB = async (task: Task, userId: string) => {
    try {
        const newTask = await db.task.create({ data: { ...task, userId: userId } });
        console.log("Task Added - ", newTask);
        return newTask;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateTaskDB = async (values: z.infer<typeof TaskUpdateSchema>, userId: string) => {
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

export const deleteTaskByIdDB = async (id: string, userId: string) => {
    try {
        const task = await db.task.delete({
            where: {
                id,
                userId,
            },
        });
        return task;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteTaskMarkToggleByID = async (id: string, userId: string) => {
    try {
        const existingTask = await db.task.findUnique({
            where: {
                id: id,
                userId: userId,
            },
        });
        if (!existingTask) {
            throw new Error("Task Not Found with given ID or User ID");
        }
        if (existingTask.isDeleted) {
            const updatedTask = await db.task.update({
                where: {
                    id,
                    userId,
                },
                data: {
                    isCompleted: existingTask.isCompleted,
                    isDeleted: false,
                    currentListType: existingTask.oldListType,
                    oldListType: TaskListTypes.Deleted,
                },
            });
            return updatedTask;
        } else {
            const updatedTask = await db.task.update({
                where: {
                    id,
                    userId,
                },
                data: {
                    isCompleted: existingTask.isCompleted,
                    isDeleted: true,
                    currentListType: TaskListTypes.Deleted,
                    oldListType: existingTask.currentListType,
                },
            });
            return updatedTask;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const completeTaskToggleByIdDB = async (id: string, userId: string) => {
    try {
        const existingTask = await db.task.findUnique({
            where: {
                id: id,
                userId: userId,
            },
        });
        if (!existingTask) {
            throw new Error("Task Not Found with given ID or User ID");
        }
        if (existingTask.isCompleted) {
            const updatedTask = await db.task.update({
                where: {
                    id,
                    userId,
                },
                data: {
                    isCompleted: false,
                    isDeleted: existingTask.isDeleted,
                    currentListType:
                        existingTask.oldListType !== TaskListTypes.Deleted
                            ? existingTask.oldListType
                            : TaskListTypes.Today,
                    oldListType: TaskListTypes.Completed,
                },
            });
            return updatedTask;
        } else {
            const updatedTask = await db.task.update({
                where: {
                    id,
                    userId,
                },
                data: {
                    isCompleted: true,
                    isDeleted: existingTask.isDeleted,
                    currentListType: TaskListTypes.Completed,
                    oldListType: existingTask.currentListType,
                },
            });
            return updatedTask;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateTaskScheduleDB = async (taskId: string, userId: string, listType: TaskListTypes) => {
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

        let updatedData: {
            currentListType: TaskListTypes;
            oldListType: TaskListTypes;
            isCompleted: boolean;
            isDeleted: boolean;
        } = {
            currentListType: listType,
            oldListType: existingTask.currentListType,
            isCompleted: false,
            isDeleted: false,
        };

        if (listType === TaskListTypes.Completed) {
            updatedData.isCompleted = true;
            updatedData.isDeleted = false;
        } else if (listType === TaskListTypes.Deleted) {
            updatedData.isCompleted = false;
            updatedData.isDeleted = true;
        } else {
            updatedData.isCompleted = false;
            updatedData.isDeleted = false;
        }

        const updatedTask = await db.task.update({
            where: { id: existingTask.id, userId: userId },
            data: updatedData,
        });
        return updatedTask;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
