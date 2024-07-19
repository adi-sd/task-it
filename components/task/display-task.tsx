"use client";

import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { Button } from "../commons/button";

interface DisplayTaskProps {
    toggleEdit: (value: boolean) => void;
}

export const DisplayTask: React.FC<DisplayTaskProps> = ({ toggleEdit }) => {
    const [isHidden, setIsHidden] = useState(false);

    const onEditClicked = () => {
        console.log("Clicked Edit Task from Display task!");
        setIsHidden(!isHidden);
        toggleEdit(!isHidden); // Setting isEdit(Parent) opposite of if the Display task is showing
    };

    return (
        <div className="w-full h-[150px] p-4 bg-sky-200 rounded-xl drop-shadow-lg flex flex-col" hidden={isHidden}>
            <div className="flex">
                <div className="font-semibold text-neutral-600 flex items-center">
                    <span>label</span>
                </div>
                <div className="ml-auto flex gap-x-2">
                    <Button onClick={onEditClicked} className="rounded-full">
                        <FaPencilAlt size={15}></FaPencilAlt>
                    </Button>
                    <Button onClick={onEditClicked} className="rounded-full">
                        <FaTrashAlt size={15}></FaTrashAlt>
                    </Button>
                </div>
            </div>
            <div className="w-full h-full py-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, fuga. Rem doloremque inventore
                consectetur id a.
            </div>
        </div>
    );
};
