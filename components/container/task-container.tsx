import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { twMerge } from "tailwind-merge";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { TaskList, TaskListRef } from "./task-list";
import { ScheduleTypes } from "@prisma/client";
import { getBgColor, getHeaderBgColor, getTextColor } from "@/lib/utils";

export interface TaskContainerProps {
    type: ScheduleTypes;
    className?: string;
}

export const TaskContainer: React.FC<TaskContainerProps> = ({ type, className }) => {
    const taskListRef = useRef<TaskListRef>(null);

    const [isListVisible, setIsListVisible] = useState(true);

    const handleAddNewTask = () => {
        if (taskListRef.current) {
            taskListRef.current.handleAddNewTask();
        }
    };

    const handleCollapseList = () => {
        setIsListVisible(!isListVisible);
    };

    const changeClassName = () => {
        const classNameArray = className?.split(" ");
        if (!isListVisible) {
            return classNameArray?.filter((item) => item !== "h-[50%]");
        }
    };

    return (
        <Collapsible
            open={isListVisible}
            onOpenChange={setIsListVisible}
            className={twMerge("w-full h-full", className)}
        >
            <div
                className={twMerge(
                    "h-[60px] w-full flex items-center",
                    getHeaderBgColor(type),
                    `${isListVisible ? "rounded-t-lg" : "rounded-lg"}`
                )}
            >
                <div className="h-full w-full flex items-center px-4">
                    <div className="flex items-center justify-center text-middle mr-auto">
                        <FaClipboardList
                            size={25}
                            className={twMerge(
                                "mr-[5px] mt-[-3px] ml-[-3px] text-white shadow-sm",
                                `hover:${getTextColor(type)}`
                            )}
                        ></FaClipboardList>
                        <span className={twMerge("font-bold text-xl", getTextColor(type))}>{type}</span>
                    </div>
                    <div className="flex gap-x-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="bg-white text-black p-2 hover:scale-105"
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
                        <CollapsibleTrigger asChild>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            className="bg-white text-black p-2 hover:scale-105"
                                            onClick={handleCollapseList}
                                        >
                                            {isListVisible ? (
                                                <IoIosArrowUp size={20}></IoIosArrowUp>
                                            ) : (
                                                <IoIosArrowDown size={20}></IoIosArrowDown>
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Collapse List</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CollapsibleTrigger>
                    </div>
                </div>
            </div>
            <CollapsibleContent className={twMerge("h-[calc(100%-60px)] rounded-b-lg w-full", getBgColor(type))}>
                <TaskList listType={type} ref={taskListRef}></TaskList>
            </CollapsibleContent>
        </Collapsible>
    );
};
