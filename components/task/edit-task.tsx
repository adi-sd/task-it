"use client";

import { useTransition } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { TaskUpdateSchema } from "@/schemas";
import { Button } from "../ui/button";
import { TaskListTypes, Task } from "@prisma/client";
import { updateTaskDB } from "@/data/task";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { TaskViewType } from "@/types/types";
import { useTasksStore } from "@/state/store";

interface DialogEditTaskProps {
    isDialog: true;
    setOpen: (value: boolean) => void;
    toggleEdit?: (newViewValue: TaskViewType, currentTaskItemValue: Task) => void;
    handleMarkTaskDeleted?: (taskId: string) => void;
    taskItem: Task;
}

interface StandaloneEditTaskProps {
    isDialog?: false;
    setOpen?: (value: boolean) => void; // Add setOpen property
    toggleEdit: (newViewValue: TaskViewType, currentTaskItemValue: Task) => void;
    handleMarkTaskDeleted: (taskId: string) => void;
    taskItem: Task;
}

type EditTaskProps = DialogEditTaskProps | StandaloneEditTaskProps;

export const EditTask: React.FC<EditTaskProps> = ({
    isDialog,
    setOpen,
    toggleEdit,
    handleMarkTaskDeleted,
    taskItem,
}) => {
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
    const addTaskStore = useTasksStore((state) => state.addTask);

    const form = useForm<z.infer<typeof TaskUpdateSchema>>({
        resolver: zodResolver(TaskUpdateSchema),
        defaultValues: {
            id: taskItem?.id,
            headline: taskItem?.headline,
            description: taskItem?.description,
            isCompleted: taskItem?.isCompleted,
            isDeleted: taskItem?.isDeleted,
            currentListType: taskItem?.currentListType,
            oldListType: taskItem?.oldListType,
        },
    });

    const onSubmit = (values: z.infer<typeof TaskUpdateSchema>) => {
        startTransition(() => {
            updateTaskDB(values as Task, user?.id!).then((updatedTask) => {
                if (updatedTask) {
                    if (isDialog) {
                        setOpen(false);
                        addTaskStore(updatedTask);
                    } else {
                        toggleEdit("display", updatedTask);
                    }
                    toast.success("Task Updated Successfully!");
                }
            });
        });
    };

    return (
        <div className="w-full h-full rounded-lg drop-shadow-lg flex flex-col px-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4 my-2 mx-[-5px]">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="headline"
                                render={({ field }) => (
                                    <FormItem className={twMerge("w-full mr-3")}>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="headline"
                                                disabled={isPending}
                                                placeholder="Task Headline..."
                                                className="font-semibold text-nowrap text-neutral-600"
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                            <div className="ml-auto flex gap-x-2">
                                <Button type="submit" className="bg-white text-black p-3" disabled={isPending}>
                                    <FaCheck></FaCheck>
                                </Button>
                                {!isDialog && (
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleMarkTaskDeleted(taskItem.id);
                                        }}
                                        className="bg-white text-black p-3"
                                    >
                                        <FaTrashAlt size={15}></FaTrashAlt>
                                    </Button>
                                )}
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Task Description..."
                                            disabled={isPending}
                                        ></Textarea>
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="currentListType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Schedule This Task..."></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={TaskListTypes.Today}>Today</SelectItem>
                                                <SelectItem value={TaskListTypes.Tomorrow}>Tomorrow</SelectItem>
                                                <SelectItem value={TaskListTypes.ThisWeek}>This Week</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                </form>
            </Form>
        </div>
    );
};
