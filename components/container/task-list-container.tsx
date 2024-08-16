"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { twMerge } from "tailwind-merge";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TaskList, TaskListRef } from "./task-list";
import { TaskListTypes } from "@prisma/client";
import { getListBgColor, getListHeaderBgColor, getListTextColor } from "@/lib/utils";

export interface TaskListContainerRef {
    isListVisible: boolean;
}

interface TaskListContainerProps {
    type: TaskListTypes;
    className?: string;
}

const TaskListContainer = forwardRef<TaskListContainerRef, TaskListContainerProps>(({ type, className }, ref) => {
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

    useImperativeHandle(ref, () => ({
        isListVisible,
    }));

    return (
        <div className={twMerge("w-full transition-all", isListVisible ? "md:h-[50%] h-[500px]" : "md:h-fit", className)}>
            <div
                className={twMerge(
                    "h-[60px] w-full flex items-center",
                    getListHeaderBgColor(type),
                    `${isListVisible ? "rounded-t-lg" : "rounded-lg"}`
                )}
            >
                <div className="h-full w-full flex items-center px-4">
                    <div className="flex items-center justify-center text-middle mr-auto">
                        <FaClipboardList
                            size={25}
                            className={twMerge(
                                "mr-[7px] mt-[-3px] ml-[-3px] text-white shadow-sm",
                                `hover:${getListTextColor(type)}`
                            )}
                        ></FaClipboardList>
                        <span className={twMerge("font-bold md:text-2xl text-xl font-mono", getListTextColor(type))}>{type}</span>
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
                    </div>
                </div>
            </div>
            {isListVisible && (
                <div
                    className={twMerge(
                        "w-full h-[calc(100%-60px)] rounded-b-lg overflow-y-auto scroll-smooth no-scrollbar",
                        getListBgColor(type)
                    )}
                >
                    <TaskList listType={type} ref={taskListRef}></TaskList>
                </div>
            )}
        </div>
    );
});

TaskListContainer.displayName = "TaskListContainer";

export { TaskListContainer };