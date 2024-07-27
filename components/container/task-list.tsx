// Motion
import { Reorder } from "framer-motion";
import { useEffect, useImperativeHandle, useRef, useState } from "react";

import { EmptyTaskTemplate, ScheduleTypes, TaskItem } from "@/lib/types";
import { Task } from "../task/task";

export interface TaskListProps {
    tasks: TaskItem[];
    listType: ScheduleTypes;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, listType }) => {
    const listRef = useRef(null);
    const [currentTasks, setCurrentTasks] = useState(tasks);

    const handleOnDrag = (event: React.DragEvent, draggedTask: TaskItem) => {
        event.dataTransfer.setData("draggedTask", JSON.stringify(draggedTask));
    };

    const handleDragOver = (event: React.DragEvent) => {
        if (event.dataTransfer) {
            event.preventDefault();
        }
    };

    const handleOnDrop = (event: React.DragEvent) => {
        const draggedTask = JSON.parse(event.dataTransfer.getData("draggedTask"));
        if (draggedTask) {
            console.log("dragged - ", draggedTask);
            setCurrentTasks([...currentTasks, draggedTask]);
        }
    };

    const handleAddNewTask = () => {
        let newTask = EmptyTaskTemplate;
        newTask.schedule = listType;
        setCurrentTasks([...currentTasks, newTask]);
    };

    useEffect(() => {
        console.log(currentTasks);
    });

    return (
        <div
            className="h-[95%] w-full rounded-lg border-2 border-black"
            onDragOver={handleDragOver}
            onDrop={handleOnDrop}
            ref={listRef}
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
    );
};
