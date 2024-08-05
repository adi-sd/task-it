import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";

import { twMerge } from "tailwind-merge";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TaskList, TaskListRef } from "./task-list";
import { ScheduleTypes } from "@prisma/client";

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

    const getBgColor = () => {
        switch (type) {
            case "Today":
                return "bg-red-200/60";
            case "Tomorrow":
                return "bg-orange-200/60";
            case "ThisWeek":
                return "bg-sky-200/60";
        }
    };

    const getHeaderBgColor = () => {
        switch (type) {
            case "Today":
                return "bg-red-300";
            case "Tomorrow":
                return "bg-orange-300";
            case "ThisWeek":
                return "bg-sky-300";
        }
    };

    const getTextColor = () => {
        switch (type) {
            case "Today":
                return "text-red-500";
            case "Tomorrow":
                return "text-yellow-600";
            case "ThisWeek":
                return "text-sky-500";
        }
    };

    return (
        <div className={twMerge("h-full w-full rounded-lg overflow-hidden", `${getBgColor()}`)}>
            <div className={twMerge("h-[5%] w-full flex items-center px-4 py-8", getHeaderBgColor())}>
                <div className="flex items-center justify-center text-middle mr-auto">
                    <FaClipboardList
                        size={25}
                        className={twMerge(
                            "mr-[5px] mt-[-3px] ml-[-3px] text-white shadow-sm",
                            `hover:${getTextColor()}`
                        )}
                    ></FaClipboardList>
                    <span className={twMerge("font-bold text-xl", `${getTextColor()}`)}>{type}</span>
                </div>
                <div className="ml-auto">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className="bg-white text-black font-bold p-2 hover:scale-105" onClick={handleAddNewTask}>
                                    <IoMdAdd size={20}></IoMdAdd>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add a new Task</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <TaskList listType={type} ref={taskListRef}></TaskList>
        </div>
    );
};
