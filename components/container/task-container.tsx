import { IoMdAdd } from "react-icons/io";

import { Button } from "../ui/button";
import { TaskList, TaskListRef } from "./task-list";
import { ScheduleTypes } from "@prisma/client";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

export interface TaskContainerProps {
    type: ScheduleTypes;
}

export const TaskContainer: React.FC<TaskContainerProps> = ({ type }) => {
    const taskListRef = useRef<TaskListRef>(null);

    const handleAddNewTask = () => {
        if (taskListRef.current) {
            taskListRef.current.handleAddNewTask();
        }
    };

    const getBgColor = (type: ScheduleTypes) => {
        switch (type) {
            case "Today":
                return "bg-red-200";
            case "Tomorrow":
                return "bg-orange-200";
            case "ThisWeek":
                return "bg-sky-200";
        }
    };

    const getBorderColor = (type: ScheduleTypes) => {
        switch (type) {
            case "Today":
                return "border-red-500";
            case "Tomorrow":
                return "border-yellow-500";
            case "ThisWeek":
                return "border-sky-500";
        }
    };

    return (
        <div
            className={twMerge(
                "h-full w-full bg--100 border-2 rounded-lg p-4",
                `${getBgColor(type)}`,
                `${getBorderColor(type)}`
            )}
        >
            <div className="h-[5%] w-full flex items-center mt-[-8px] mb-2">
                <div className="mr-auto">
                    <span className="font-bold text-lg">{type} -</span>
                </div>
                <div className="ml-auto">
                    <Button className="bg-white text-black font-bold p-2" onClick={handleAddNewTask}>
                        <IoMdAdd size={20}></IoMdAdd>
                    </Button>
                </div>
            </div>
            <TaskList listType={type} ref={taskListRef}></TaskList>
        </div>
    );
};
