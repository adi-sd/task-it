"use client";

import { twMerge } from "tailwind-merge";
import { TaskListContainer, TaskListContainerRef } from "./task-list-container";
import { TaskListTypes } from "@prisma/client";
import { useRef } from "react";
import { CompletedTaskListContainer } from "./completed-task-list-container";

interface ScheduledTaskContainersProps {
    className?: string;
}

export const ScheduledTaskContainers: React.FC<ScheduledTaskContainersProps> = ({ className }) => {
    const TomorrowListRef = useRef<TaskListContainerRef>(null);
    const ThisWeekListRef = useRef<TaskListContainerRef>(null);
    const CompletedLisRef = useRef<TaskListContainerRef>(null);

    return (
        <div
            className={twMerge(
                "flex md:flex-row flex-col items-center justify-center md:gap-x-6 gap-y-6 p-6",
                className
            )}
        >
            <TaskListContainer className="md:h-full md:w-[35%] w-full" type={TaskListTypes.Today}></TaskListContainer>
            <div className="h-full md:w-[35%] w-full flex flex-col gap-y-6">
                <TaskListContainer ref={TomorrowListRef} type={TaskListTypes.Tomorrow}></TaskListContainer>
                <TaskListContainer ref={ThisWeekListRef} type={TaskListTypes.ThisWeek}></TaskListContainer>
                <CompletedTaskListContainer ref={CompletedLisRef}></CompletedTaskListContainer>
            </div>
        </div>
    );
};
