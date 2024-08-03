"use client";

import { TaskContainer } from "./task-container";
import { ScheduleTypes } from "@prisma/client";

interface ScheduledTaskContainersProps {}

export const ScheduledTaskContainers: React.FC<ScheduledTaskContainersProps> = () => {
    return (
        <div className="w-full h-[1000px] flex items-center justify-center gap-x-10 p-10">
            <TaskContainer type={ScheduleTypes.Today}></TaskContainer>
            <TaskContainer type={ScheduleTypes.Tomorrow}></TaskContainer>
            <TaskContainer type={ScheduleTypes.ThisWeek}></TaskContainer>
        </div>
    );
};
