"use client";

// Motion
import { Reorder } from "framer-motion";

import { ScheduleTypes, TaskItem } from "@/lib/types";
import { Task } from "../task/task";
import { useRef, useState } from "react";
import { objectExistsInArray } from "@/lib/utils";

export interface TaskContainerProps {
    type: ScheduleTypes;
    tasks: TaskItem[];
}

export const TaskContainer: React.FC<TaskContainerProps> = ({ type, tasks }) => {
    const taskListRef = useRef(null);
    const [currentTasks, setCurrentTasks] = useState(tasks.filter((task) => task.schedule === type));

    const handleOnDrag = (event: React.DragEvent, task: TaskItem) => {
        event.dataTransfer.setData("draggedTask", JSON.stringify(task));
    };

    const handleDragOver = (event: React.DragEvent) => {
        if (event.dataTransfer) {
            event.preventDefault();
        }
    };

    const handleOnDrop = (event: React.DragEvent) => {
        const draggedTask = JSON.parse(event.dataTransfer.getData("draggedTask"));
        if (draggedTask) {
            setCurrentTasks(currentTasks.filter((item) => item.id === draggedTask.id));
            console.log("dragged - ", draggedTask);
            const existingTask = objectExistsInArray(tasks, draggedTask);
            if (existingTask) {
                existingTask.schedule = type;
                setCurrentTasks([...currentTasks, existingTask]);
                console.log("existing - ", existingTask);
            }
        }
    };

    return (
        <div className="h-full w-full bg-slate-200 rounded-lg p-6">
            <div className="h-[5%] w-full">
                <span className="font-bold text-xl">{type} -</span>
            </div>
            <div
                className="h-[95%] w-full rounded-lg border-2 border-black"
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                ref={taskListRef}
            >
                <Reorder.Group values={currentTasks} onReorder={setCurrentTasks} className="flex flex-col gap-y-2 p-2">
                    {currentTasks && currentTasks.length !== 0
                        ? currentTasks.map((task) => {
                              return (
                                  <div key={task.id} draggable onDragStart={(e) => handleOnDrag(e, task)}>
                                      <Reorder.Item value={task} className="h-fit">
                                          <Task task={task}></Task>
                                      </Reorder.Item>
                                  </div>
                              );
                          })
                        : null}
                </Reorder.Group>
            </div>
        </div>
    );
};
