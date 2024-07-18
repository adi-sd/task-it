"use client";

import { useState } from "react";

// Styling
import { twMerge } from "tailwind-merge";

// Motion
import { motion } from "framer-motion";

// Components
import { DisplayTask } from "./display-task";
import { EditTask } from "./edit-task";

export const Task = () => {
    const [editTask, setEditTask] = useState(false);

    const toggleEdit = (newValue: boolean) => {
        setEditTask(newValue);
    };

    return (
        <motion.div drag>
            <div
                className={twMerge(
                    "w-full flex flex-col gap-y-4 rounded-xl transition-all",
                    `${editTask ? "h-[250px]" : "h-[150px]"}`
                )}
            >
                {editTask ? (
                    <EditTask toggleEdit={toggleEdit}></EditTask>
                ) : (
                    <DisplayTask toggleEdit={toggleEdit}></DisplayTask>
                )}
            </div>
        </motion.div>
    );
};
