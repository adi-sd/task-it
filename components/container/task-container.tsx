"use client";

import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import { EmptyTaskTemplate, ScheduleTypes, TaskItem } from "@/lib/types";
import { Button } from "../ui/button";
import { TaskList } from "./task-list";

export interface TaskContainerProps {
    type: ScheduleTypes;
    tasks: TaskItem[];
}

export const TaskContainer: React.FC<TaskContainerProps> = ({ type, tasks }) => {
    const [scheduledTasks, setScheduledTasks] = useState(tasks.filter((taskItem) => taskItem.schedule === type));

    const handleAddExistingTask = (newTask: TaskItem) => {
        newTask.schedule = type;
        setScheduledTasks([...scheduledTasks, newTask]);
        console.log("Added New task");
    };

    const taskListRef = useRef<typeof TaskList>(null);

    return (
        <div className="h-full w-full bg-slate-200 rounded-lg p-6">
            <div className="h-[5%] w-full flex items-center mt-[-8px] mb-2">
                <div className="mr-auto">
                    <span className="font-bold text-xl">{type} -</span>
                </div>
                <div className="ml-auto">
                    <Button className="bg-white text-black font-bold p-2">
                        <IoMdAdd size={20}></IoMdAdd>
                    </Button>
                </div>
            </div>
            <TaskList listType={type} tasks={scheduledTasks}></TaskList>
        </div>
    );
};
