"use client";

import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { Button } from "../ui/button";
import { Task } from "@prisma/client";
import { deleteTaskById } from "@/data/task";

interface DisplayTaskProps {
    toggleEdit: (value: boolean, currentTaskValue: Task) => void;
    taskItem: Task;
}

export const DisplayTask: React.FC<DisplayTaskProps> = ({ toggleEdit, taskItem }) => {
    const [isHidden, setIsHidden] = useState(false);

    const onEditClicked = () => {
        setIsHidden(!isHidden);
        toggleEdit(!isHidden, taskItem); // Setting isEdit(Parent) opposite of if the Display task is showing
    };

    const onDeleteClicked = (id: string) => {
        deleteTaskById(id).then(() => {
            console.log("Task Deleted", id);
        });
    };

    return (
        <div className="w-full h-full rounded-xl drop-shadow-lg flex flex-col" hidden={isHidden}>
            <div className="flex flex-col gap-y-4">
                <div className="flex">
                    <div className="font-semibold text-neutral-600 flex items-center overflow-hidden">
                        <span className="text-nowrap overflow-hidden text-ellipsis mr-4">{taskItem.headline}</span>
                    </div>
                    <div className="ml-auto flex gap-x-2">
                        <Button onClick={onEditClicked} className="rounded-full">
                            <FaPencilAlt size={15}></FaPencilAlt>
                        </Button>
                        <Button onClick={() => onDeleteClicked(taskItem.id)} className="rounded-full">
                            <FaTrashAlt size={15}></FaTrashAlt>
                        </Button>
                    </div>
                </div>
                <div className="text-lg h-full block overflow-hidden text-ellipsis">
                    <p className="">{taskItem.description}</p>
                </div>
            </div>
        </div>
    );
};
