"use client";

import { useState } from "react";

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { DisplayTask } from "./display-task";
import { EditTask } from "./edit-task";
import { ScheduleTypes, TaskItem } from "@/lib/types";

interface EmptyTaskProps {}

const emptyTask: TaskItem = {
    headline: "",
    description: "",
    schedule: ScheduleTypes.Today,
    isCompleted: false,
};

export const EmptyTask: React.FC<EmptyTaskProps> = () => {
    const [editTask, setEditTask] = useState(true);
    const [taskItemValue, setTaskItemValue] = useState(emptyTask);

    const toggleEdit = (newValue: boolean, currentTaskValue: TaskItem) => {
        setEditTask(newValue);
        setTaskItemValue(currentTaskValue);
    };

    return (
        <div
            className={twMerge(
                "w-full h-fit p-4 flex flex-col gap-y-4 rounded-xl transition-all",
                `${editTask ? "bg-green-200" : "bg-sky-200"}`
            )}
        >
            {editTask ? (
                <EditTask toggleEdit={toggleEdit} taskItem={taskItemValue}></EditTask>
            ) : (
                <DisplayTask toggleEdit={toggleEdit} taskItem={taskItemValue}></DisplayTask>
            )}
        </div>
    );
};
