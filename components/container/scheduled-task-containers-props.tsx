"use client";

import { ScheduleTypes, TaskItem } from "@/lib/types";
import { TaskContainerProps, TaskContainer } from "./task-container";
import { ReactHTMLElement, ReactNode, useCallback, useRef } from "react";

interface ScheduledTaskContainersProps {
    tasks: TaskItem[];
}

export const ScheduledTaskContainers: React.FC<ScheduledTaskContainersProps> = ({ tasks }) => {
    
    return (
        <div className="w-full h-[1000px] flex items-center justify-center gap-x-10 p-10">
            <TaskContainer type={ScheduleTypes.Today} tasks={tasks}></TaskContainer>
            <TaskContainer type={ScheduleTypes.Tomorrow} tasks={tasks}></TaskContainer>
            <TaskContainer type={ScheduleTypes.ThisWeek} tasks={tasks}></TaskContainer>
        </div>
    );
};
