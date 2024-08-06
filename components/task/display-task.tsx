"use client";

import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { Button } from "../ui/button";
import { Task } from "@prisma/client";

interface DisplayTaskProps {
    toggleEdit: (newViewValue: "display" | "edit", currentTaskValue: Task) => void;
    handleDeleteTask: (taskId: string) => void;
    taskItem: Task;
}

export const DisplayTask: React.FC<DisplayTaskProps> = ({ toggleEdit, handleDeleteTask, taskItem }) => {
    const onEditClicked = () => {
        toggleEdit("edit", taskItem);
    };

    const onDeleteClicked = (id: string) => {
        handleDeleteTask(id);
    };

    return (
        <div className="w-full h-full rounded-lg drop-shadow-lg flex flex-col">
            <div className="flex flex-col gap-y-4">
                <div className="flex">
                    <div className="font-semibold flex items-center overflow-hidden">
                        <span className="text-nowrap overflow-hidden text-ellipsis mr-4">{taskItem.headline}</span>
                    </div>
                    <div className="ml-auto flex gap-x-2">
                        <Button onClick={onEditClicked} className="bg-white text-black">
                            <FaPencilAlt size={15}></FaPencilAlt>
                        </Button>
                        <Button onClick={() => onDeleteClicked(taskItem.id)} className=" bg-white text-black">
                            <FaTrashAlt size={15}></FaTrashAlt>
                        </Button>
                    </div>
                </div>
                {taskItem.description !== "" && (
                    <div className="text-lg h-full block overflow-hidden text-ellipsis">
                        <p className="">{taskItem.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
