"use client";

import { useState, useTransition } from "react";
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
import { ScheduleTypes, Task } from "@prisma/client";
import { updateTask } from "@/data/task";
import { useCurrentUser } from "@/hooks/use-current-user";

interface EditTaskProps {
    toggleEdit: (newViewValue: "display" | "edit", currentTaskItemValue: Task) => void;
    handleDeleteTask: (taskId: string) => void;
    taskItem: Task;
}

export const EditTask: React.FC<EditTaskProps> = ({ toggleEdit, handleDeleteTask, taskItem }) => {
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof TaskUpdateSchema>>({
        resolver: zodResolver(TaskUpdateSchema),
        defaultValues: {
            id: taskItem.id,
            headline: taskItem.headline,
            description: taskItem.description,
            schedule: taskItem.schedule,
            isCompleted: taskItem.isCompleted,
        },
    });

    const onSubmit = (values: z.infer<typeof TaskUpdateSchema>) => {
        startTransition(() => {
            updateTask(values as Task, user?.id!).then((updatedTask) => {
                if (updatedTask) {
                    toggleEdit("display", updatedTask);
                }
            });
        });
    };

    const onDeleteClicked = (id: string) => {
        handleDeleteTask(id);
    };

    return (
        <div className="w-full h-full rounded-lg drop-shadow-lg flex flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4 my-2 mx-[-5px]">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="headline"
                                render={({ field }) => (
                                    <FormItem className="w-full mr-3">
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
                                <Button
                                    onClick={() => onDeleteClicked(taskItem.id)}
                                    className="bg-white text-black p-3"
                                >
                                    <FaTrashAlt size={15}></FaTrashAlt>
                                </Button>
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
                            name="schedule"
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
                                                <SelectItem value={ScheduleTypes.Today}>Today</SelectItem>
                                                <SelectItem value={ScheduleTypes.Tomorrow}>Tomorrow</SelectItem>
                                                <SelectItem value={ScheduleTypes.ThisWeek}>This Week</SelectItem>
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
