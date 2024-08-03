import { IoMdAdd } from "react-icons/io";

import { Button } from "../ui/button";
import { TaskList, TaskListRef } from "./task-list";
import { ScheduleTypes } from "@prisma/client";
import { useRef } from "react";

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
        <div className="h-full w-full bg-slate-200 rounded-lg p-6">
            <div className="h-[5%] w-full flex items-center mt-[-8px] mb-2">
                <div className="mr-auto">
                    <span className="font-bold text-xl">{type} -</span>
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
