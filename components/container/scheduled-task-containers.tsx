"use client";

import { twMerge } from "tailwind-merge";
import { TaskContainer, TaskContainerRef } from "./task-container";
import { ScheduleTypes } from "@prisma/client";
import { useRef } from "react";

interface ScheduledTaskContainersProps {
    className?: string;
}

export const ScheduledTaskContainers: React.FC<ScheduledTaskContainersProps> = ({ className }) => {
    const TomorrowListRef = useRef<TaskContainerRef>(null);
    const ThisWeekListRef = useRef<TaskContainerRef>(null);

    return (
        <div className={twMerge("flex items-center justify-center gap-x-6 p-6", className)}>
            <TaskContainer className="h-full w-[40%]" type={ScheduleTypes.Today}></TaskContainer>
            <div className="h-full w-[40%] flex flex-col gap-y-6">
                <TaskContainer ref={TomorrowListRef} type={ScheduleTypes.Tomorrow}></TaskContainer>
                <TaskContainer ref={ThisWeekListRef} type={ScheduleTypes.ThisWeek}></TaskContainer>
            </div>
        </div>
    );
};
