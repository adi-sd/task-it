import { create } from "zustand";
import { Task, TaskListTypes } from "@prisma/client";

export type State = {
    Tasks: Task[];
    isLoading: boolean;
};

export type Actions = {
    // Task List
    setAllTasks: (tasks: Task[]) => void;
    getTypeSpecificTasks: (type: TaskListTypes) => Task[];
    // Task
    getTaskById: (taskId: string) => Task | undefined;
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: string) => void;
    // Loading
    setIsLoading: (isLoading: boolean) => void;
};

export const useTasksStore = create<State & Actions>((set) => ({
    Tasks: [],
    isLoading: false,
    setAllTasks: (tasks) => set({ Tasks: tasks }),
    getTypeSpecificTasks: (type): Task[] => {
        return useTasksStore.getState().Tasks.filter((task: Task) => task.currentListType === type);
    },
    getTaskById: (taskId): Task | undefined => {
        return useTasksStore.getState().Tasks.find((task: Task) => task.id === taskId);
    },
    addTask: (task) => {
        set((state) => ({ Tasks: [...state.Tasks, task] }));
    },
    updateTask: (task) => {
        set((state) => ({
            Tasks: state.Tasks.map((t) => (t.id === task.id ? task : t)),
        }));
    },
    deleteTask: (taskId) => {
        set((state) => ({ Tasks: state.Tasks.filter((task) => task.id !== taskId) }));
    },
    setIsLoading: (isLoading) => set({ isLoading }),
}));
