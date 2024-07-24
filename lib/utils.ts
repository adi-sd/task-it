import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TaskItem } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const objectExistsInArray = (tasks: TaskItem[], task: TaskItem): TaskItem | null => {
    const foundObject = tasks.find((item) => item.id === task.id);
    return foundObject || null;
};
