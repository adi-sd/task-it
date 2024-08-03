"use client";

import { useState, useTransition } from "react";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { TaskUpdateSchema } from "@/schemas";
import { Button } from "../ui/button";
import { ScheduleTypes, Task } from "@prisma/client";
import { updateTask } from "@/data/task";

interface EditTaskProps {
    toggleEdit: (value: boolean, currentTaskValue: Task) => void;
    taskItem: Task;
}

export const EditTask: React.FC<EditTaskProps> = ({ toggleEdit, taskItem }) => {
    const [isHidden, setIsHidden] = useState(false);
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
            updateTask(values).then(() => {
                setIsHidden(!isHidden); // Setting isEdit(Parent) to exact value of if Edit Task is showing
                toggleEdit(isHidden, values as Task);
                // Call a server action to update the task in db
            });
        });
    };

    return (
        <div className="w-full h-full rounded-lg drop-shadow-lg flex flex-col" hidden={isHidden}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="headline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="headline"
                                                disabled={isPending}
                                                placeholder="Task Headline..."
                                                className="font-semibold text-nowrap text-md  text-neutral-600"
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                            <Button type="submit" className="w-fit ml-auto" disabled={isPending}>
                                <FaCheck></FaCheck>
                            </Button>
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
