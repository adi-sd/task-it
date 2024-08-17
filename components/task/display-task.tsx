"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FcOk, FcCancel } from "react-icons/fc";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { Task, TaskListTypes } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { getTaskShadowColor } from "@/lib/utils";
import { updateTaskScheduleDB } from "@/data/task";
import { useCurrentUser } from "@/hooks/use-current-user";

interface DisplayTaskProps {
    toggleEdit: (newViewValue: "display" | "edit", currentTaskValue: Task) => void;
    handleDeleteTask: (taskId: string) => void;
    handleCompleteTask: (taskId: string) => void;
    taskItem: Task;
}

export interface DisplayTaskRef {
    toggleDisplayMinimize: () => void;
}

const DisplayTask = forwardRef<DisplayTaskRef, DisplayTaskProps>(
    ({ toggleEdit, handleDeleteTask, handleCompleteTask, taskItem }, ref) => {
        const user = useCurrentUser();
        const [isMinimized, setIsMinimized] = useState(false);

        const onEditClicked = () => {
            toggleEdit("edit", taskItem);
        };

        const handleCurrentListTypeUpdate = async (newListType: TaskListTypes) => {
            const updatedTask = await updateTaskScheduleDB(taskItem.id, user?.id!, newListType);
            if (updatedTask) {
                toggleEdit("display", updatedTask);
            }
        };

        useImperativeHandle(ref, () => ({
            toggleDisplayMinimize: () => {
                setIsMinimized(!isMinimized);
            },
        }));

        return (
            <div className="w-full h-full rounded-lg drop-shadow-sm flex flex-col">
                <div className={twMerge("flex flex-col gap-y-4 mt-1 mb-2")}>
                    <div className="px-4 flex">
                        <div className="font-semibold flex items-center overflow-hidden">
                            <span className="text-nowrap overflow-hidden text-ellipsis mr-4">{taskItem.headline}</span>
                        </div>
                        <div className="ml-auto flex gap-x-2">
                            <div className="md:hidden w-[130px]">
                                <Select value={taskItem.currentListType} onValueChange={handleCurrentListTypeUpdate}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Schedule This Task..."></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={TaskListTypes.Today}>Today</SelectItem>
                                        <SelectItem value={TaskListTypes.Tomorrow}>Tomorrow</SelectItem>
                                        <SelectItem value={TaskListTypes.ThisWeek}>This Week</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditClicked();
                                }}
                                className="bg-white text-black p-3"
                            >
                                <FaPencilAlt size={15}></FaPencilAlt>
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTask(taskItem.id);
                                }}
                                className=" bg-white text-black p-3"
                            >
                                <FaTrashAlt size={15}></FaTrashAlt>
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCompleteTask(taskItem.id);
                                }}
                                className=" bg-white text-black p-3"
                            >
                                {!taskItem.isCompleted ? <FcOk size={20}></FcOk> : <FcCancel size={20}></FcCancel>}
                            </Button>
                        </div>
                    </div>
                    {isMinimized && (
                        <div className={twMerge(getTaskShadowColor(taskItem.currentListType, "display"))}>
                            {taskItem.description !== "" ? (
                                <div className="h-full w-full overflow-hidden text-ellipsis flex flex-col gap-y-2 p-4">
                                    <p className="">{taskItem.description}</p>
                                </div>
                            ) : (
                                <div className="h-full block overflow-hidden text-ellipsis p-4">
                                    <p className="text-slate-500">No Description for the Task!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

DisplayTask.displayName = "DisplayTask";

export { DisplayTask };
