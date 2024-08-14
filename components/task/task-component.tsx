"use client";

import { use, useEffect, useRef, useState, MouseEvent } from "react";

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { DisplayTask, DisplayTaskRef } from "./display-task";
import { EditTask } from "./edit-task";
import { ScheduleTypes, Task } from "@prisma/client";
import { getTaskBgColor, getTaskBorderColor } from "@/lib/utils";

interface TaskProps {
    task: Task;
    handleDeleteTask: (taskId: string) => void;
}

export const TaskComponent: React.FC<TaskProps> = ({ task, handleDeleteTask }) => {
    const [taskView, setTaskView] = useState<"display" | "edit">("display");
    const [taskItemValue, setTaskItemValue] = useState(task);

    const displayTaskRef = useRef<DisplayTaskRef>(null);

    const toggleEdit = (newViewValue: "display" | "edit", currentTaskItemValue: Task) => {
        setTaskView(newViewValue);
        setTaskItemValue(currentTaskItemValue);
    };

    const handleToggleDisplayMinimize = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (displayTaskRef.current) {
            displayTaskRef.current.toggleDisplayMinimize();
        }
    };

    useEffect(() => {
        if (taskItemValue.headline === "") {
            setTaskView("edit");
        }
    }, [taskItemValue]);

    return (
        <div
            className={twMerge(
                "w-full h-fit py-2 flex flex-col gap-y-4 rounded-xl shadow-md transition-all",
                `${getTaskBgColor(taskItemValue.schedule)}`,
                `${getTaskBorderColor(taskItemValue.schedule, taskView)}`
            )}
            onClick={handleToggleDisplayMinimize}
        >
            {" "}
            {taskView == "edit" ? (
                <EditTask
                    toggleEdit={toggleEdit}
                    taskItem={taskItemValue}
                    handleDeleteTask={handleDeleteTask}
                ></EditTask>
            ) : (
                <DisplayTask
                    toggleEdit={toggleEdit}
                    taskItem={taskItemValue}
                    handleDeleteTask={handleDeleteTask}
                    ref={displayTaskRef}
                ></DisplayTask>
            )}
        </div>
    );
};
