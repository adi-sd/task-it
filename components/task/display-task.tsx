"use client";

import { useState } from "react";

interface DisplayTaskProps {
    toggleEdit: (value: boolean) => void;
}

export const DisplayTask: React.FC<DisplayTaskProps> = ({ toggleEdit }) => {
    const [isHidden, setIsHidden] = useState(false);

    const handleDisplayTaskOnClick = () => {
        console.log("Clicked Display Task!");
        setIsHidden(!isHidden);
        toggleEdit(!isHidden); // Setting isEdit(Parent) opposite of if the Display task is showing
    };

    return (
        <div
            className="w-full h-[150px] p-4 bg-sky-200 rounded-xl drop-shadow-lg"
            onClick={handleDisplayTaskOnClick}
            hidden={isHidden}
        >
            <div>Display Task</div>
        </div>
    );
};
