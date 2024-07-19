"use client";

import { useState } from "react";

// Styling
import { twMerge } from "tailwind-merge";

// Motion
import { motion } from "framer-motion";

// Components
import { DisplayTask } from "./display-task";
import { EditTask } from "./edit-task";
import { ScheduleTypes, TaskItem } from "@/lib/types";

export const Task = () => {
    const [editTask, setEditTask] = useState(false);

    const taskItem: TaskItem = {
        id: "xyz123",
        headline: "This is a test task",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore officia ullam possimus modi sint aut earum odit autem veniam in facere accusamus harum.",
        schedule: ScheduleTypes.Today, // Replace "today" with a valid value from ScheduleTypes
        isCompleted: false,
        timestamps: {
            createdAt: new Date(),
            lastModifiedAt: new Date(),
        },
    };

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
                    <EditTask toggleEdit={toggleEdit} taskItem={taskItem}></EditTask>
                ) : (
                    <DisplayTask toggleEdit={toggleEdit} taskItem={taskItem}></DisplayTask>
                )}
            </div>
        </motion.div>
    );
};
