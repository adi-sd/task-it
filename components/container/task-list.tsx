// Motion
import { Reorder } from "framer-motion";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { EmptyTaskTemplate } from "@/lib/types";
import { TaskComponent } from "@/components/task/task-component";
import { addNewTask, deleteTaskById, getAllTasksOfType, updateTask, updateTaskSchedule } from "@/data/task";
import { Task, ScheduleTypes } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BeatLoader } from "react-spinners";
import { twJoin, twMerge } from "tailwind-merge";
import { getBgColor, getSignatureColor, getTextColor } from "@/lib/utils";
import { get } from "http";

interface TaskListProps {
    listType: ScheduleTypes;
}

export interface TaskListRef {
    handleAddNewTask: () => void;
}

export const revalidate = 0;

const TaskList = forwardRef<TaskListRef, TaskListProps>(({ listType }, ref) => {
    const taskListRef = useRef<HTMLDivElement>(null);
    const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleOnDragStart = (event: React.DragEvent, draggedTask: Task) => {
        if (event.dataTransfer) {
            event.dataTransfer.setData("text/plain", JSON.stringify(draggedTask));
            event.dataTransfer.effectAllowed = "move";
            setTimeout(() => {
                setCurrentTasks((currentTasks) => {
                    return currentTasks.filter((task) => task.id !== draggedTask.id);
                });
            }, 100);
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            if (taskListRef.current) {
                taskListRef.current.classList.add("border-dashed", "border-2", "border-gray-500");
            }
        }
    };

    const handleOnDrop = (event: React.DragEvent) => {
        const draggedTask = JSON.parse(event.dataTransfer.getData("text/plain")) as Task;
        console.log("dragged - ", draggedTask);
        updateTaskSchedule(draggedTask.id, listType).then((updatedTask) => {
            setCurrentTasks([...currentTasks, updatedTask]);
            if (taskListRef.current) {
                taskListRef.current.classList.remove("border-dashed", "border-2", "border-gray-500");
            }
        });
    };

    const handleDragLeave = () => {
        if (taskListRef.current) {
            taskListRef.current.classList.remove("border-dashed", "border-2", "border-gray-500");
        }
    };

    const handleAddNewTask = async () => {
        let newTask = EmptyTaskTemplate;
        newTask.schedule = listType;
        const newDbTask = await addNewTask(newTask as Task);
        setCurrentTasks([...currentTasks, newDbTask]);
    };

    const handleDeleteTask = (id: string) => {
        deleteTaskById(id).then(() => {
            console.log("Task Deleted", id);
            setCurrentTasks(currentTasks.filter((task) => task.id != id));
        });
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const result = await getAllTasksOfType(listType);
            console.log(result);
            setCurrentTasks(result);
        };
        fetchTasks().finally(() => setIsLoading(false));
    }, [listType]);

    useImperativeHandle(ref, () => ({
        handleAddNewTask: handleAddNewTask,
    }));

    useEffect(() => {}, [currentTasks]);

    return (
        <div
            ref={taskListRef}
            className={`h-full w-full p-2 ${getBgColor(listType)}`}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleOnDrop(e)}
            onDragLeave={handleDragLeave}
        >
            {!isLoading ? (
                currentTasks && currentTasks.length !== 0 ? (
                    <ScrollArea className="w-full h-full flex items-center justify-center">
                        <Reorder.Group
                            values={currentTasks}
                            onReorder={setCurrentTasks}
                            className="w-full h-full flex flex-col gap-y-2"
                        >
                            {currentTasks.map((task) => {
                                return (
                                    <div key={task.id} draggable onDragStart={(e) => handleOnDragStart(e, task)}>
                                        <Reorder.Item value={task} className="h-fit">
                                            <TaskComponent
                                                task={task}
                                                handleDeleteTask={() => handleDeleteTask(task.id)}
                                            ></TaskComponent>
                                        </Reorder.Item>
                                    </div>
                                );
                            })}
                        </Reorder.Group>
                    </ScrollArea>
                ) : (
                    <div
                        className={twMerge(
                            "h-full w-full flex items-center justify-center text-sm",
                            `${getTextColor(listType)}`
                        )}
                    >
                        <p>No Tasks Found!</p>
                    </div>
                )
            ) : (
                <div className="h-full w-full flex items-center justify-center">
                    <BeatLoader size={10} color={getSignatureColor(listType)} speedMultiplier={2}></BeatLoader>
                </div>
            )}
        </div>
    );
});

TaskList.displayName = "TaskList";

export { TaskList };
