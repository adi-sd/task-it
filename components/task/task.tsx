"use client";

import { useState } from "react";

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { DisplayTask } from "./display-task";
import { EditTask } from "./edit-task";
import { TaskItem } from "@/lib/types";

interface TaskProps {
    task: TaskItem;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
    const [editTask, setEditTask] = useState(false);
    const [taskItemValue, setTaskItemValue] = useState(task);

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
