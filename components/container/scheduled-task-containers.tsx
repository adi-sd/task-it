import { twMerge } from "tailwind-merge";
import { TaskContainer } from "./task-container";
import { ScheduleTypes } from "@prisma/client";

interface ScheduledTaskContainersProps {
    className?: string;
}

export const ScheduledTaskContainers: React.FC<ScheduledTaskContainersProps> = ({ className }) => {
    return (
        <div className={twMerge("flex items-center justify-center gap-x-6 p-6", className)}>
            <TaskContainer className="h-full w-[30%]" type={ScheduleTypes.Today}></TaskContainer>
            <div className="h-full w-[30%] flex flex-col gap-y-6">
                <TaskContainer className="h-[50%] w-full min-h-0" type={ScheduleTypes.Tomorrow}></TaskContainer>
                <TaskContainer className="h-[50%] w-full min-h-0" type={ScheduleTypes.ThisWeek}></TaskContainer>
            </div>
        </div>
    );
};
