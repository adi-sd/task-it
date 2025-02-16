"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaTrashRestoreAlt } from "react-icons/fa";
import { FcOk, FcCancel } from "react-icons/fc";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { Task, TaskListTypes } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { getTaskShadowColor } from "@/lib/utils";
import { updateTaskScheduleDB } from "@/data/task";
import { useCurrentUser } from "@/hooks/use-current-user";
import { TaskViewType } from "@/types/types";
import { useTasksStore } from "@/state/store";
import { toast } from "sonner";

interface DisplayTaskProps {
    toggleEdit: (newViewValue: TaskViewType, currentTaskValue: Task) => void;
    handleMarkTaskDeleted: (taskId: string) => void;
    handleCompleteTask: (taskId: string) => void;
    handleDeleteTask: (taskId: string) => void;
    taskItem: Task;
}

export interface DisplayTaskRef {
    toggleDisplayMinimize: () => void;
}

const DisplayTask = forwardRef<DisplayTaskRef, DisplayTaskProps>(
    ({ toggleEdit, handleMarkTaskDeleted, handleCompleteTask, handleDeleteTask, taskItem }, ref) => {
        const user = useCurrentUser();
        const updateTaskStore = useTasksStore((state) => state.updateTask);
        const [isMinimized, setIsMinimized] = useState(false);

        const onEditClicked = () => {
            toggleEdit("edit", taskItem);
        };

        const handleCurrentListTypeUpdate = (newListType: TaskListTypes) => {
            updateTaskScheduleDB(taskItem.id, user?.id!, newListType)
                .then((updatedTask) => {
                    updateTaskStore(updatedTask);
                    toast.success("Task Schedule Updated!");
                    toggleEdit("display", updatedTask);
                })
                .catch((error) => {
                    console.error("Failed to Update Task Schedule!", error);
                    toast.error("Failed to Update Task Schedule!");
                });
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
                            {!taskItem.isDeleted && (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEditClicked();
                                    }}
                                    className="bg-white text-black p-3"
                                >
                                    <FaPencilAlt size={15}></FaPencilAlt>
                                </Button>
                            )}
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkTaskDeleted(taskItem.id);
                                }}
                                className=" bg-white text-black p-3"
                            >
                                {!taskItem.isDeleted ? (
                                    <FaTrashAlt size={15}></FaTrashAlt>
                                ) : (
                                    <FaTrashRestoreAlt size={15}></FaTrashRestoreAlt>
                                )}
                            </Button>
                            {!taskItem.isDeleted && (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCompleteTask(taskItem.id);
                                    }}
                                    className=" bg-white text-black p-3"
                                >
                                    {!taskItem.isCompleted ? <FcOk size={20}></FcOk> : <FcCancel size={20}></FcCancel>}
                                </Button>
                            )}
                            {taskItem.isDeleted && (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteTask(taskItem.id);
                                    }}
                                    className=" bg-white text-black p-3"
                                >
                                    <FaTrashAlt size={15} className="text-red-600"></FaTrashAlt>
                                </Button>
                            )}
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
