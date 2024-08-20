"use client";

import { twMerge } from "tailwind-merge";
import { TaskListContainer, TaskListContainerRef } from "./task-list-container";
import { Task, TaskListTypes } from "@prisma/client";
import { CompletedTaskListContainer } from "./completed-task-list-container";
import { useTasksStore } from "@/state/store";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect } from "react";
import { getAllTasksDB } from "@/data/task";
import { DeletedTaskListContainer } from "./deleted-task-list-container";

interface ScheduledTaskContainersProps {
    className?: string;
}

export const ScheduledTaskContainers: React.FC<ScheduledTaskContainersProps> = ({ className }) => {
    const user = useCurrentUser();
    const { setAllTasks: setAllTasksStore, setIsLoading } = useTasksStore((state) => ({ ...state }));

    useEffect(() => {
        const fetchTasks = async () => {
            getAllTasksDB(user?.id!)
                .then((tasks: Task[]) => {
                    setAllTasksStore(tasks);
                })
                .catch((error: Error) => {
                    console.error(error);
                });
        };
        setIsLoading(true);
        fetchTasks().finally(() => setIsLoading(false));
    }, [setAllTasksStore, user, setIsLoading]);

    return (
        <div
            className={twMerge(
                "flex md:flex-row flex-col items-center justify-center md:gap-x-6 gap-y-6 p-6",
                className
            )}
        >
            <TaskListContainer className="md:h-full md:w-[35%] w-full" type={TaskListTypes.Today}></TaskListContainer>
            <div className="h-full md:w-[35%] w-full flex flex-col gap-y-6">
                <TaskListContainer type={TaskListTypes.Tomorrow}></TaskListContainer>
                <TaskListContainer type={TaskListTypes.ThisWeek}></TaskListContainer>
                <CompletedTaskListContainer></CompletedTaskListContainer>
                <DeletedTaskListContainer></DeletedTaskListContainer>
            </div>
        </div>
    );
};
