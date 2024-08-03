"use client";

import { useState } from "react";

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { DisplayTask } from "./display-task";
import { EditTask } from "./edit-task";
import { ScheduleTypes, Task } from "@prisma/client";

interface TaskProps {
    task: Task;
    handleDeleteTask: (taskId: string) => void;
}

export const TaskComponent: React.FC<TaskProps> = ({ task, handleDeleteTask }) => {
    const [editTask, setEditTask] = useState(false);
    const [taskItemValue, setTaskItemValue] = useState(task);

    const toggleEdit = (newValue: boolean, currentTaskValue: Task) => {
        setEditTask(newValue);
        setTaskItemValue(currentTaskValue);
    };

    const getBgColor = (type: ScheduleTypes) => {
        if (taskItemValue.headline !== "") {
            if (!editTask) {
                switch (type) {
                    case "Today":
                        return "bg-red-300";
                    case "Tomorrow":
                        return "bg-orange-300";
                    case "ThisWeek":
                        return "bg-sky-300";
                }
            }
        }
        return "bg-green-300";
    };

    return (
        <div
            className={twMerge(
                "w-full h-fit p-4 flex flex-col gap-y-4 rounded-xl shadow-md transition-all",
                `${getBgColor(taskItemValue.schedule)}`
            )}
        >
            {taskItemValue.headline !== "" ? (
                editTask ? (
                    <EditTask toggleEdit={toggleEdit} taskItem={taskItemValue}></EditTask>
                ) : (
                    <DisplayTask
                        toggleEdit={toggleEdit}
                        taskItem={taskItemValue}
                        handleDeleteTask={handleDeleteTask}
                    ></DisplayTask>
                )
            ) : (
                <EditTask toggleEdit={toggleEdit} taskItem={taskItemValue}></EditTask>
            )}
        </div>
    );
};
