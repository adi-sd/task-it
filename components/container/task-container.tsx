import { IoMdAdd } from "react-icons/io";

import { Button } from "../ui/button";
import { TaskList } from "./task-list";
import { ScheduleTypes, Task } from "@prisma/client";

export interface TaskContainerProps {
    type: ScheduleTypes;
}

export const TaskContainer: React.FC<TaskContainerProps> = ({ type }) => {
    const handleAddNewTask = () => {};

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
            <TaskList listType={type}></TaskList>
        </div>
    );
};
