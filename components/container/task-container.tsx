"use client";

// Motion
import { motion, useDragControls } from "framer-motion";
import { Reorder } from "framer-motion";

import { ScheduleTypes, TaskItem } from "@/lib/types";
import { Task } from "../task/task";
import { useRef, useState } from "react";

interface TaskContainerProps {
    type: ScheduleTypes;
    tasks: TaskItem[];
}

export const TaskContainer: React.FC<TaskContainerProps> = ({ type, tasks }) => {
    const [currentTasks, setCurrentTasks] = useState(tasks.filter((task) => task.schedule === type));
    const taskListRef = useRef(null);
    const controls = useDragControls();

    return (
        <div className="h-full w-full bg-slate-200 rounded-lg p-6">
            <div className="h-[5%] w-full">
                <span className="font-bold text-xl">{type} -</span>
            </div>
            <motion.div className="h-[95%] w-full rounded-lg border-2 border-black " ref={taskListRef}>
                <Reorder.Group values={currentTasks} onReorder={setCurrentTasks} className="flex flex-col gap-y-2 p-2">
                    {currentTasks && currentTasks.length !== 0
                        ? currentTasks.map((task) => {
                              return (
                                  <motion.div
                                      drag
                                      whileDrag={{
                                          scale: 1.05,
                                      }}
                                      dragConstraints={taskListRef}
                                      key={task.id}
                                      className="h-fit"
                                  >
                                      <Reorder.Item value={task}>
                                          <Task task={task}></Task>
                                      </Reorder.Item>
                                  </motion.div>
                              );
                          })
                        : null}
                </Reorder.Group>
            </motion.div>
        </div>
    );
};
