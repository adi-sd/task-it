"use client";

import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { EditTask } from "./edit-task";
import { Task, TaskListTypes } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { EmptyTaskTemplate } from "@/types/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addNewTaskDB } from "@/data/task";
import { useTasksStore } from "@/state/store";

interface TaskDialogProps {
    children: React.ReactNode;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ children }) => {
    const user = useCurrentUser();
    const addTaskStore = useTasksStore((state) => state.addTask);
    const [open, setOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    const handleAddNewTask = async () => {
        let newTask = EmptyTaskTemplate;
        newTask.currentListType = TaskListTypes.Today;
        newTask.userId = user?.id;
        const newDbTask = await addNewTaskDB(newTask as Task, user?.id!);
        console.log("Task Added - ", newDbTask);
        addTaskStore(newDbTask);
        setCurrentTask(newDbTask);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogOverlay className="bg-white/0 backdrop-blur-sm"></DialogOverlay>
            <DialogTrigger asChild onClick={handleAddNewTask}>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
                <DialogTitle>Create a New Task</DialogTitle>
                <div className={twMerge("flex flex-col gap-y-4 h-[600px] w-[500px] bg-white/90 p-6 rounded-lg")}>
                    <div className="px-4 py-2">
                        <span className="font-bold text-xl font-mono text-indigo-700">Add a New Task...</span>
                    </div>
                    {currentTask && <EditTask isDialog setOpen={setOpen} taskItem={currentTask}></EditTask>}
                </div>
            </DialogContent>
        </Dialog>
    );
};
