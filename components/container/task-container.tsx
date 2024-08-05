import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";

import { twMerge } from "tailwind-merge";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TaskList, TaskListRef } from "./task-list";
import { ScheduleTypes } from "@prisma/client";
import { getBgColor, getHeaderBgColor, getTextColor } from "@/lib/utils";

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

    return (
        <div className={twMerge("h-full w-full rounded-lg overflow-hidden", `${getBgColor(type)}`)}>
            <div className={twMerge("h-[5%] w-full flex items-center px-4 py-8", getHeaderBgColor(type))}>
                <div className="flex items-center justify-center text-middle mr-auto">
                    <FaClipboardList
                        size={25}
                        className={twMerge(
                            "mr-[5px] mt-[-3px] ml-[-3px] text-white shadow-sm",
                            `hover:${getTextColor(type)}`
                        )}
                    ></FaClipboardList>
                    <span className={twMerge("font-bold text-xl", `${getTextColor(type)}`)}>{type}</span>
                </div>
                <div className="ml-auto">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="bg-white text-black font-bold p-2 hover:scale-105"
                                    onClick={handleAddNewTask}
                                >
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
