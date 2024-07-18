"use client";

import { useState } from "react";
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
        <div className="w-full h-[150px] p-4 bg-sky-200 rounded-xl drop-shadow-lg" hidden={isHidden}>
            <div>Display Task</div>
            <Button onClick={onEditClicked}>Edit</Button>
        </div>
    );
};
