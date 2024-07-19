"use client";

import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { TaskButton } from "../commons/task-button";
import { TaskItem } from "@/lib/types";

interface DisplayTaskProps {
    toggleEdit: (value: boolean) => void;
    taskItem: TaskItem;
}

export const DisplayTask: React.FC<DisplayTaskProps> = ({ toggleEdit, taskItem }) => {
    const [isHidden, setIsHidden] = useState(false);

    const onEditClicked = () => {
        console.log("Clicked Edit Task from Display task!");
        setIsHidden(!isHidden);
        toggleEdit(!isHidden); // Setting isEdit(Parent) opposite of if the Display task is showing
    };

    return (
        <div className="w-full h-[180px] p-4 bg-sky-200 rounded-xl drop-shadow-lg flex flex-col" hidden={isHidden}>
            <div className="flex flex-col gap-y-4">
                <div className="flex">
                    <div className="font-semibold text-neutral-600 flex items-center overflow-hidden">
                        <span className="text-nowrap overflow-hidden text-ellipsis mr-4">{taskItem.headline}</span>
                    </div>
                    <div className="ml-auto flex gap-x-2">
                        <TaskButton onClick={onEditClicked} className="rounded-full">
                            <FaPencilAlt size={15}></FaPencilAlt>
                        </TaskButton>
                        <TaskButton onClick={onEditClicked} className="rounded-full">
                            <FaTrashAlt size={15}></FaTrashAlt>
                        </TaskButton>
                    </div>
                </div>
                <div className="text-lg w-full h-full block overflow-hidden text-ellipsis">
                    <p className="">{taskItem.description}</p>
                </div>
            </div>
        </div>
    );
};
