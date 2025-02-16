// Motion
import { Reorder } from "framer-motion";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { EmptyTaskTemplate } from "@/types/types";
import { TaskComponent } from "@/components/task/task-component";
import {
    addNewTaskDB,
    completeTaskToggleByIdDB,
    deleteTaskByIdDB,
    deleteTaskMarkToggleByID,
    updateTaskScheduleDB,
} from "@/data/task";
import { Task, TaskListTypes } from "@prisma/client";
import { BeatLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";
import { getSignatureColor, getListTextColor } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTasksStore } from "@/state/store";
import { toast } from "sonner";

interface TaskListProps {
    className?: string;
    listType: TaskListTypes;
}

export interface TaskListRef {
    handleAddNewTask: () => void;
}

export const revalidate = 0;

const TaskList = forwardRef<TaskListRef, TaskListProps>(({ className, listType }, ref) => {
    const user = useCurrentUser();
    const isLoading = useTasksStore((state) => state.isLoading);
    const taskListRef = useRef<HTMLDivElement>(null);
    const currentTasks = useTasksStore((state) => state.getTypeSpecificTasks(listType));
    const {
        addTask: addTaskStore,
        updateTask: updateTaskStore,
        deleteTask: deleteTaskStore,
    } = useTasksStore((state) => ({ ...state }));

    const handleOnDragStart = (event: React.DragEvent, draggedTask: Task) => {
        if (event.dataTransfer) {
            event.dataTransfer.setData("text/plain", JSON.stringify(draggedTask));
            event.dataTransfer.effectAllowed = "move";
            setTimeout(() => {
                deleteTaskStore(draggedTask.id);
            }, 100);
        }
    };

    // Drag and Drop Handlers
    const handleDragOver = (event: React.DragEvent) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            if (taskListRef.current) {
                taskListRef.current.classList.add("rounded-b-lg", "border-dashed", "border-2", "border-gray-500");
            }
        }
    };

    const handleOnDrop = (event: React.DragEvent) => {
        const draggedTask = JSON.parse(event.dataTransfer.getData("text/plain")) as Task;
        console.log("Dropped Task - ", draggedTask);
        updateTaskScheduleDB(draggedTask.id, user?.id!, listType).then((updatedTask) => {
            addTaskStore(updatedTask);
            if (taskListRef.current) {
                taskListRef.current.classList.remove("border-dashed", "border-2", "border-gray-500");
            }
            toast.success("Task Schedule Updated!");
        });
    };

    const handleDragLeave = () => {
        if (taskListRef.current) {
            taskListRef.current.classList.remove("border-dashed", "border-2", "border-gray-500");
        }
    };

    const handleDragEnd = () => {
        if (taskListRef.current) {
            taskListRef.current.classList.remove("border-dashed", "border-2", "border-gray-500");
        }
    };

    // Button Event Handlers
    const handleAddNewTask = () => {
        let newTask = EmptyTaskTemplate;
        newTask.currentListType = listType;
        newTask.oldListType = listType;
        newTask.userId = user?.id;
        addNewTaskDB(newTask as Task, user?.id!)
            .then((newDbTask) => {
                console.log("Task Added - ", newDbTask);
                toast.success("New Task Added!");
                addTaskStore(newDbTask);
            })
            .catch((error) => {
                console.error("Failed to Add New Task!", error);
                toast.error("Failed to Add New Task!");
            });
    };

    const handleMarkTaskDeleted = (id: string) => {
        deleteTaskMarkToggleByID(id, user?.id!)
            .then((updatedTask) => {
                updateTaskStore(updatedTask);
                toast.success("Task Sent to Bin!");
            })
            .catch((error) => {
                console.error("Failed to send task to Bin!", error);
                toast.error("Failed to send task to Bin!");
            });
    };

    const handlePermanentDeleteTask = (id: string) => {
        deleteTaskByIdDB(id, user?.id!)
            .then(() => {
                console.log("Task Deleted", id);
                deleteTaskStore(id);
                toast.success("Task Deleted Permanently!");
            })
            .catch((error) => {
                console.error("Failed to Delete Task!", error);
                toast.error("Failed to Delete Task!");
            });
    };

    const handleCompleteTask = (id: string) => {
        completeTaskToggleByIdDB(id, user?.id!)
            .then((updatedTask) => {
                updateTaskStore(updatedTask);
                toast.success("Task Completed!");
            })
            .catch((error) => {
                console.error("Failed to Complete Task!", error);
                toast.error("Failed to Complete Task!");
            });
    };

    useImperativeHandle(ref, () => ({
        handleAddNewTask: handleAddNewTask,
    }));

    return (
        <div
            className={twMerge("h-full w-full py-3 px-3", className)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleOnDrop(e)}
            onDragLeave={handleDragLeave}
            ref={taskListRef}
        >
            {user ? (
                !isLoading ? (
                    currentTasks && currentTasks.length !== 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Reorder.Group
                                values={currentTasks}
                                onReorder={() => {
                                    // Implement Priority Reordering
                                }}
                                className="w-full h-full flex flex-col gap-y-3"
                            >
                                {currentTasks.map((task, index, row) => {
                                    return (
                                        <div
                                            key={task.id}
                                            draggable
                                            onDragStart={(e) => handleOnDragStart(e, task)}
                                            onDragEnd={handleDragEnd}
                                        >
                                            <Reorder.Item value={task} className="h-fit">
                                                <TaskComponent
                                                    taskId={task.id}
                                                    handleMarkTaskDeleted={() => handleMarkTaskDeleted(task.id)}
                                                    handleCompleteTask={() => handleCompleteTask(task.id)}
                                                    handleDeleteTask={() => handlePermanentDeleteTask(task.id)}
                                                ></TaskComponent>
                                            </Reorder.Item>
                                        </div>
                                    );
                                })}
                            </Reorder.Group>
                        </div>
                    ) : (
                        <div
                            className={twMerge(
                                "h-full w-full flex items-center justify-center text-sm",
                                `${getListTextColor(listType)}`
                            )}
                        >
                            <p>No Tasks Found!</p>
                        </div>
                    )
                ) : (
                    <div className="h-full w-full flex items-center justify-center">
                        <BeatLoader size={10} color={getSignatureColor(listType)} speedMultiplier={2}></BeatLoader>
                    </div>
                )
            ) : (
                <div
                    className={twMerge(
                        "h-full w-full flex items-center justify-center text-sm",
                        `${getListTextColor(listType)}`
                    )}
                >
                    <p>Please Login to Proceed!</p>
                </div>
            )}
        </div>
    );
});

TaskList.displayName = "TaskList";

export { TaskList };
