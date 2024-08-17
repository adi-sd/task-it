import { create } from "zustand";
import { Task, TaskListTypes } from "@prisma/client";
import { use } from "react";

export type State = {
    Tasks: {
        Today: Task[];
        Tomorrow: Task[];
        ThisWeek: Task[];
        Completed: Task[];
        Deleted: Task[];
    };
    isLoading: boolean;
};

export type Actions = {
    // Task List
    setAllTasks: (tasks: Task[]) => void;
    // getTypeSpecificTasks: (type: TaskListTypes) => Task[];
    setTypesSpecificTasks: (type: TaskListTypes, tasks: Task[]) => void;
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: string) => void;
    // Loading
    setIsLoading: (isLoading: boolean) => void;
    // Task
    getTaskById: (taskId: string) => Task | undefined;
};

export const useTasksStore = create<State & Actions>((set) => ({
    Tasks: {
        Today: [],
        Tomorrow: [],
        ThisWeek: [],
        Completed: [],
        Deleted: [],
    },
    isLoading: false,
    setIsLoading: (isLoading) => {
        set(() => {
            return {
                isLoading,
            };
        });
    },
    setAllTasks: (tasks) => {
        set(() => {
            const TodayTasks = tasks.filter((task) => task.currentListType === "Today");
            const TomorrowTasks = tasks.filter((task) => task.currentListType === "Tomorrow");
            const ThisWeekTasks = tasks.filter((task) => task.currentListType === "ThisWeek");
            const CompletedTasks = tasks.filter((task) => task.isCompleted);
            const DeletedTasks = tasks.filter((task) => task.isDeleted);
            return {
                Tasks: {
                    Today: TodayTasks,
                    Tomorrow: TomorrowTasks,
                    ThisWeek: ThisWeekTasks,
                    Completed: CompletedTasks,
                    Deleted: DeletedTasks,
                },
            };
        });
    },
    // getTypeSpecificTasks: (type: TaskListTypes): Task[] => {
    //     return useTasksStore.getState().Tasks[type];
    // },
    setTypesSpecificTasks: (type, tasks) => {
        set((state) => {
            return {
                Tasks: {
                    ...state.Tasks,
                    [type]: tasks,
                },
            };
        });
    },
    addTask: (task) => {
        set((state) => {
            const { currentListType } = task;
            return {
                Tasks: {
                    ...state.Tasks,
                    [currentListType]: [...state.Tasks[currentListType], task],
                },
            };
        });
    },
    updateTask: (task) => {
        set((state) => {
            const { currentListType } = task;
            return {
                Tasks: {
                    ...state.Tasks,
                    [currentListType]: state.Tasks[currentListType].map((t) => (t.id === task.id ? task : t)),
                },
            };
        });
    },
    deleteTask: (taskId) => {
        set((state) => {
            const task = state.Tasks.Today.find((t) => t.id === taskId);
            if (task) {
                return {
                    Tasks: {
                        ...state.Tasks,
                        TodayTasks: state.Tasks.Today.filter((t) => t.id !== taskId),
                        DeletedTasks: [...state.Tasks.Deleted, task],
                    },
                };
            }
            return state;
        });
    },
    getTaskById: (taskId: string): Task | undefined => {
        const state = useTasksStore.getState();
        const allTasks = [
            ...state.Tasks.Today,
            ...state.Tasks.Tomorrow,
            ...state.Tasks.ThisWeek,
            ...state.Tasks.Completed,
            ...state.Tasks.Deleted,
        ];
        return allTasks.find((task) => task.id === taskId);
    },
}));
