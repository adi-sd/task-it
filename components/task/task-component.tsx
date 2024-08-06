"use client";

import { use, useEffect, useState } from "react";

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
    const [taskView, setTaskView] = useState<"display" | "edit">("display");
    const [taskItemValue, setTaskItemValue] = useState(task);

    const toggleEdit = (newViewValue: "display" | "edit", currentTaskItemValue: Task) => {
        setTaskView(newViewValue);
        setTaskItemValue(currentTaskItemValue);
    };

    const getBgColor = (type: ScheduleTypes) => {
        if (taskItemValue.headline !== "") {
            if (taskView === "display") {
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

    useEffect(() => {
        if (taskItemValue.headline === "") {
            setTaskView("edit");
        }
    }, [taskItemValue]);

    return (
        <div
            className={twMerge(
                "w-full h-fit p-4 flex flex-col gap-y-4 rounded-xl shadow-md transition-all",
                `${getBgColor(taskItemValue.schedule)}`
            )}
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
                ></DisplayTask>
            )}
        </div>
    );
};
