"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../commons/task-button";
import { TaskItem } from "@/libs/types";

interface EditTaskProps {
    toggleEdit: (value: boolean) => void;
    taskItem: TaskItem;
}

export const EditTask: React.FC<EditTaskProps> = ({ toggleEdit, taskItem }) => {
    const [isHidden, setIsHidden] = useState(false);

    const onDoneClicked = () => {
        console.log("Clicked Done from Edit Task!");
        setIsHidden(!isHidden);
        toggleEdit(isHidden); // Setting isEdit(Parent) to exact value of if Edit Task is showing
    };

    return (
        <div className="w-full h-[250px] p-4 bg-green-200 rounded-xl drop-shadow-lg flex flex-col" hidden={isHidden}>
            <div className="flex">
                <div className="font-semibold text-neutral-600 flex items-center">
                    <span>{taskItem.headline}</span>
                </div>
                <div className="ml-auto flex gap-x-2">
                    <Button onClick={onDoneClicked} className="rounded-full">
                        <FaCheck size={15}></FaCheck>
                    </Button>
                </div>
            </div>
            <div className=" text-lg w-full h-full my-3">
                <p>{taskItem.description}</p>
            </div>
        </div>
    );
};
