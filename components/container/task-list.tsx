// Motion
import { Reorder } from "framer-motion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { EmptyTaskTemplate } from "@/lib/types";
import { TaskComponent } from "../task/task-component";
import { addNewTask, getAllTasksOfType } from "@/data/task";
import { Task, ScheduleTypes } from "@prisma/client";

interface TaskListProps {
    listType: ScheduleTypes;
}

export interface TaskListRef {
    handleAddNewTask: () => void;
}

const TaskList = forwardRef<TaskListRef, TaskListProps>(({ listType }, ref) => {
    const [currentTasks, setCurrentTasks] = useState<Task[]>([]);

    const handleOnDrag = (event: React.DragEvent, draggedTask: Task) => {
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

    const handleAddNewTask = async () => {
        let newTask = EmptyTaskTemplate;
        newTask.schedule = listType;
        const newDbTask = await addNewTask(newTask as Task);
        setCurrentTasks([...currentTasks, newDbTask]);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const result = await getAllTasksOfType(listType);
            console.log(result);
            setCurrentTasks(result);
        };
        fetchTasks();
    }, [listType, setCurrentTasks]);

    useImperativeHandle(ref, () => ({
        handleAddNewTask: handleAddNewTask,
    }));

    return (
        <div
            className="h-[95%] w-full rounded-lg border-2 border-black"
            onDragOver={handleDragOver}
            onDrop={handleOnDrop}
        >
            {/* <div onClick={handleAddNewTask}>Add New</div> */}
            <Reorder.Group values={currentTasks} onReorder={setCurrentTasks} className="flex flex-col gap-y-2 p-2">
                {currentTasks && currentTasks.length !== 0
                    ? currentTasks.map((task) => {
                          return (
                              <div key={task.id} draggable onDragStart={(e) => handleOnDrag(e, task)}>
                                  <Reorder.Item value={task} className="h-fit">
                                      <TaskComponent task={task}></TaskComponent>
                                  </Reorder.Item>
                              </div>
                          );
                      })
                    : null}
            </Reorder.Group>
        </div>
    );
});

TaskList.displayName = "TaskList";

export { TaskList };

// export const TaskList: React.FC<TaskListProps> = ({ listType }) => {
//     const listRef = useRef(null);
//     const [currentTasks, setCurrentTasks] = useState<Task[]>([]);

//     const handleOnDrag = (event: React.DragEvent, draggedTask: Task) => {
//         event.dataTransfer.setData("draggedTask", JSON.stringify(draggedTask));
//     };

//     const handleDragOver = (event: React.DragEvent) => {
//         if (event.dataTransfer) {
//             event.preventDefault();
//         }
//     };

//     const handleOnDrop = (event: React.DragEvent) => {
//         const draggedTask = JSON.parse(event.dataTransfer.getData("draggedTask"));
//         if (draggedTask) {
//             console.log("dragged - ", draggedTask);
//             setCurrentTasks([...currentTasks, draggedTask]);
//         }
//     };

//     const handleAddNewTask = () => {
//         let newTask = EmptyTaskTemplate;
//         newTask.schedule = listType;
//         addTask(newTask as Task);
//         setCurrentTasks([...currentTasks, newTask as Task]);
//     };

//     useEffect(() => {
//         const fetchTasks = async () => {
//             const result = await getAllTasksOfType(listType);
//             console.log(result);
//             setCurrentTasks(result);
//         };
//         fetchTasks();
//     }, [listType, setCurrentTasks]);

//     return (
//         <div
//             className="h-[95%] w-full rounded-lg border-2 border-black"
//             onDragOver={handleDragOver}
//             onDrop={handleOnDrop}
//             ref={listRef}
//         >
//             <div onClick={handleAddNewTask}>Add New</div>
//             <Reorder.Group values={currentTasks} onReorder={setCurrentTasks} className="flex flex-col gap-y-2 p-2">
//                 {currentTasks && currentTasks.length !== 0
//                     ? currentTasks.map((task) => {
//                           return (
//                               <div key={task.id} draggable onDragStart={(e) => handleOnDrag(e, task)}>
//                                   <Reorder.Item value={task} className="h-fit">
//                                       <TaskComponent task={task}></TaskComponent>
//                                   </Reorder.Item>
//                               </div>
//                           );
//                       })
//                     : null}
//             </Reorder.Group>
//         </div>
//     );
// };
