"use client";

import { useState } from "react";

// Components
import { DisplayTask } from "./display-task";
import { EditTask } from "./edit-task";

export const Task = () => {
    const [editTask, setEditTask] = useState(false);

    const toggleEdit = (newValue: boolean) => {
        setEditTask(newValue);
    };

    return (
        <div className="w-full h-[250px] flex flex-col gap-y-4 rounded-xl">
            {editTask ? (
                <EditTask toggleEdit={toggleEdit}></EditTask>
            ) : (
                <DisplayTask toggleEdit={toggleEdit}></DisplayTask>
            )}
        </div>
    );
};
