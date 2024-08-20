import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Task, TaskListTypes } from "@prisma/client";
import { TaskViewType } from "@/types/types";

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

export const getSignatureColor = (type: TaskListTypes) => {
    switch (type) {
        case "Today":
            return "red";
        case "Tomorrow":
            return "orange";
        case "ThisWeek":
            return "skyblue";
        case "Completed":
            return "emerald";
        case "Deleted":
            return "stone";
    }
};

export const getListBgColor = (type: TaskListTypes) => {
    switch (type) {
        case "Today":
            return "bg-red-200/60";
        case "Tomorrow":
            return "bg-orange-200/60";
        case "ThisWeek":
            return "bg-sky-200/60";
        case "Completed":
            return "bg-emerald-200/60";
        case "Deleted":
            return "bg-stone-200/60";
    }
};

export const getListHeaderBgColor = (type: TaskListTypes) => {
    switch (type) {
        case "Today":
            return "bg-red-300";
        case "Tomorrow":
            return "bg-orange-300";
        case "ThisWeek":
            return "bg-sky-300";
        case "Completed":
            return "bg-emerald-300";
        case "Deleted":
            return "bg-stone-300";
    }
};

export const getListTextColor = (type: TaskListTypes) => {
    switch (type) {
        case "Today":
            return "text-red-600";
        case "Tomorrow":
            return "text-yellow-700";
        case "ThisWeek":
            return "text-sky-600";
        case "Completed":
            return "text-emerald-600";
        case "Deleted":
            return "text-stone-600";
    }
};

export const getTaskBgColor = (type: TaskListTypes, taskView?: TaskViewType) => {
    if (taskView == "display" || taskView == "edit") {
        return getListHeaderBgColor(type);
    }
};

export const getTaskBorderColor = (type: TaskListTypes, taskView: TaskViewType) => {
    if (taskView == "edit") {
        switch (type) {
            case "Today":
                return "border-4 border-red-900/30";
            case "Tomorrow":
                return "border-4 border-orange-900/30";
            case "ThisWeek":
                return "border-4 border-sky-900/30";
            case "Completed":
                return "border-4 border-emerald-900/30";
            case "Deleted":
                return "border-4 border-stone-900/30";
        }
    }
    return "";
};

export const getTaskShadowColor = (type: TaskListTypes, taskView: TaskViewType) => {
    if (taskView == "display") {
        switch (type) {
            case "Today":
                return "my-inner-shadow-red";
            case "Tomorrow":
                return "my-inner-shadow-orange";
            case "ThisWeek":
                return "my-inner-shadow-blue";
            case "Completed":
                return "my-inner-shadow-emerald";
            case "Deleted":
                return "my-inner-shadow-stone";
        }
    }
    return "";
};
