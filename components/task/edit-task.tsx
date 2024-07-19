"use client";

import { useState } from "react";

import { FaCheck } from "react-icons/fa";

import { Button } from "../commons/button";

interface EditTaskProps {
    toggleEdit: (value: boolean) => void;
}

export const EditTask: React.FC<EditTaskProps> = ({ toggleEdit }) => {
    const [isHidden, setIsHidden] = useState(false);

    const onDoneClicked = () => {
        console.log("Clicked Done from Edit Task!");
        setIsHidden(!isHidden);
        toggleEdit(isHidden); // Setting isEdit(Parent) to exact value of if Edit Task is showing
    };

    return (
        <div className="w-full h-[250px] p-4 bg-green-200 rounded-xl drop-shadow-lg" hidden={isHidden}>
            <div className="flex">
                <div className="font-semibold text-neutral-600 flex items-center">
                    <span>label</span>
                </div>
                <div className="ml-auto flex gap-x-2">
                    <Button onClick={onDoneClicked} className="rounded-full">
                        <FaCheck size={15}></FaCheck>
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
