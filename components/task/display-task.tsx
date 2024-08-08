"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { Button } from "../ui/button";
import { Task } from "@prisma/client";
import { twMerge } from "tailwind-merge";

interface DisplayTaskProps {
    toggleEdit: (newViewValue: "display" | "edit", currentTaskValue: Task) => void;
    handleDeleteTask: (taskId: string) => void;
    taskItem: Task;
}

export interface DisplayTaskRef {
    toggleDisplayMinimize: () => void;
}

const DisplayTask = forwardRef<DisplayTaskRef, DisplayTaskProps>(({ toggleEdit, handleDeleteTask, taskItem }, ref) => {
    const [isMinimized, setIsMinimized] = useState(false);

    const onEditClicked = () => {
        toggleEdit("edit", taskItem);
    };

    const onDeleteClicked = (id: string) => {
        handleDeleteTask(id);
    };

    useImperativeHandle(ref, () => ({
        toggleDisplayMinimize: () => {
            setIsMinimized(!isMinimized);
        },
    }));

    return (
        <div className="w-full h-full rounded-lg drop-shadow-sm flex flex-col">
            <div className={twMerge("flex flex-col gap-y-4 mt-1 mb-2")}>
                <div className={twMerge("flex", `${isMinimized && "border-b-4 border-b-white/50 pb-4"}`)}>
                    <div className="font-semibold flex items-center overflow-hidden">
                        <span className="text-nowrap overflow-hidden text-ellipsis mr-4">{taskItem.headline}</span>
                    </div>
                    <div className="ml-auto flex gap-x-2">
                        <Button onClick={onEditClicked} className="bg-white text-black p-3">
                            <FaPencilAlt size={15}></FaPencilAlt>
                        </Button>
                        <Button onClick={() => onDeleteClicked(taskItem.id)} className=" bg-white text-black p-3">
                            <FaTrashAlt size={15}></FaTrashAlt>
                        </Button>
                    </div>
                </div>
                {isMinimized &&
                    (taskItem.description !== "" ? (
                        <div className="h-full w-full overflow-hidden text-ellipsis flex flex-col gap-y-2">
                            <p className="">{taskItem.description}</p>
                        </div>
                    ) : (
                        <div className="h-full block overflow-hidden text-ellipsis">
                            <p className="text-slate-500">No Description for the Task!</p>
                        </div>
                    ))}
            </div>
        </div>
    );
});

DisplayTask.displayName = "DisplayTask";

export { DisplayTask };
