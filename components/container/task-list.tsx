// Motion
import { Reorder } from "framer-motion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { EmptyTaskTemplate } from "@/lib/types";
import { TaskComponent } from "@/components/task/task-component";
import { addNewTask, deleteTaskById, getAllTasksOfType, updateTask, updateTaskSchedule } from "@/data/task";
import { Task, ScheduleTypes } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BeatLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";
import { getSignatureColor, getTextColor } from "@/lib/utils";

interface TaskListProps {
    listType: ScheduleTypes;
}

export interface TaskListRef {
    handleAddNewTask: () => void;
}

const TaskList = forwardRef<TaskListRef, TaskListProps>(({ listType }, ref) => {
    const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleOnDragStart = (event: React.DragEvent, draggedTask: Task) => {
        if (event.dataTransfer) {
            event.dataTransfer.setData("draggedTask", JSON.stringify(draggedTask));
            setTimeout(() => {
                setCurrentTasks((currentTasks) =>
                    currentTasks.filter((task) => {
                        task.id !== draggedTask.id;
                    })
                );
            }, 1000);
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        if (event.dataTransfer) {
            event.preventDefault();
        }
    };

    const handleOnDrop = (event: React.DragEvent) => {
        const draggedTask = JSON.parse(event.dataTransfer.getData("draggedTask"));
        if (draggedTask) {
            if (!currentTasks.find((task) => task.id === draggedTask.id)) {
                console.log("dragged - ", draggedTask);
                updateTaskSchedule(draggedTask.id, listType).then(() => {
                    setCurrentTasks([...currentTasks, draggedTask]);
                });
            }
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

    const handleUpdateTask = (task: Task) => {
        updateTask(task).then((updatedTask) => {
            if (updatedTask) {
                setCurrentTasks([...currentTasks, updatedTask]);
            }
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

    useEffect(() => {
        // Task List Changed
    }, [currentTasks]);

    return (
        <div className="h-[95%] w-full rounded-lg p-4" onDragOver={handleDragOver} onDrop={handleOnDrop}>
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
                                                handleUpdateTask={async () => handleUpdateTask(task)}
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
