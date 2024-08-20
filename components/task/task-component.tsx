"use client";

import { use, useEffect, useRef, useState, MouseEvent } from "react";

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { DisplayTask, DisplayTaskRef } from "./display-task";
import { EditTask } from "./edit-task";
import { Task } from "@prisma/client";
import { getTaskBgColor, getTaskBorderColor } from "@/lib/utils";
import { useTasksStore } from "@/state/store";
import { TaskViewType } from "@/types/types";

interface TaskProps {
    taskId: string;
    handleDeleteTask: (taskId: string) => void;
    handleCompleteTask: (taskId: string) => void;
}

export const TaskComponent: React.FC<TaskProps> = ({ taskId, handleDeleteTask, handleCompleteTask }) => {
    const [taskView, setTaskView] = useState<"display" | "edit">("display");
    // const [taskItemValue, setTaskItemValue] = useState(task);
    const taskItemValue = useTasksStore((state) => state.getTaskById(taskId));
    const updateTaskStore = useTasksStore((state) => state.updateTask);

    const displayTaskRef = useRef<DisplayTaskRef>(null);

    const toggleEdit = (newViewValue: TaskViewType, currentTaskItemValue: Task) => {
        setTaskView(newViewValue);
        updateTaskStore(currentTaskItemValue);
    };

    const handleToggleDisplayMinimize = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (displayTaskRef.current) {
            displayTaskRef.current.toggleDisplayMinimize();
        }
    };

    useEffect(() => {
        if (taskItemValue?.headline === "") {
            setTaskView("edit");
        }
    }, [taskItemValue]);

    if (!taskItemValue) return null;

    return (
        <div
            className={twMerge(
                "w-full h-fit py-2 flex flex-col gap-y-4 rounded-xl shadow-md transition-all",
                `${getTaskBgColor(taskItemValue.currentListType, taskView)}`,
                `${getTaskBorderColor(taskItemValue.currentListType, taskView)}`
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
                    handleCompleteTask={handleCompleteTask}
                    ref={displayTaskRef}
                ></DisplayTask>
            )}
        </div>
    );
};
