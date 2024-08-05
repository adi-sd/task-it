import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Task, ScheduleTypes } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const objectExistsInArray = (tasks: Task[], task: Task): Task | null => {
    const foundObject = tasks.find((item) => item.id === task.id);
    return foundObject || null;
};

export const getSignatureColor = (type: ScheduleTypes) => {
    switch (type) {
        case "Today":
            return "red";
        case "Tomorrow":
            return "orange";
        case "ThisWeek":
            return "skyblue";
    }
};

export const getBgColor = (type: ScheduleTypes) => {
    switch (type) {
        case "Today":
            return "bg-red-200/60";
        case "Tomorrow":
            return "bg-orange-200/60";
        case "ThisWeek":
            return "bg-sky-200/60";
    }
};

export const getHeaderBgColor = (type: ScheduleTypes) => {
    switch (type) {
        case "Today":
            return "bg-red-300";
        case "Tomorrow":
            return "bg-orange-300";
        case "ThisWeek":
            return "bg-sky-300";
    }
};

export const getTextColor = (type: ScheduleTypes) => {
    switch (type) {
        case "Today":
            return "text-red-500";
        case "Tomorrow":
            return "text-yellow-600";
        case "ThisWeek":
            return "text-sky-500";
    }
};
