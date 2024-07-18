"use client";

import { useState } from "react";
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
            <div>
                Edit Task <br />
                <Button onClick={onDoneClicked}>Done</Button>
            </div>
        </div>
    );
};
