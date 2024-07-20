"use client";

import { startTransition, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { TaskButton } from "../commons/task-button";
import { Select } from "../commons/select";
import { ScheduleTypes, TaskItem } from "@/lib/types";
import { TaskSchema } from "@/schemas";

const scheduleTypes = [
    {
        value: ScheduleTypes.Today,
        label: ScheduleTypes.Today,
    },
    {
        value: ScheduleTypes.Tomorrow,
        label: ScheduleTypes.Tomorrow,
    },
    {
        value: ScheduleTypes.ThisWeek,
        label: ScheduleTypes.ThisWeek,
    },
];

interface EditTaskProps {
    toggleEdit: (value: boolean) => void;
    taskItem: TaskItem;
}

export const EditTask: React.FC<EditTaskProps> = ({ toggleEdit, taskItem }) => {
    const [isHidden, setIsHidden] = useState(false);

    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
    });

    const onDoneClicked = () => {
        console.log("Clicked Done from Edit Task!");
        setIsHidden(!isHidden);
        toggleEdit(isHidden); // Setting isEdit(Parent) to exact value of if Edit Task is showing
    };

    const onSubmit = (values: z.infer<typeof TaskSchema>) => {
        startTransition(() => {
            console.log(values);
            onDoneClicked();
        });
    };

    return (
        <div className="w-full h-fit p-4 bg-green-200 rounded-xl drop-shadow-lg flex flex-col" hidden={isHidden}>
            {/* <div className="font-semibold text-neutral-600 flex items-center">
                    <span>Edit - {taskItem.id}</span>
                </div> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex">
                            <FormField
                                control={form.control}
                                name="headline"
                                render={({ field }) => (
                                    <FormItem className="w-full mr-4">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="headline"
                                                value={taskItem.headline}
                                                className="text-neutral-600"
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                            <div className="ml-auto flex gap-x-2">
                                <TaskButton className="rounded-full" onClick={() => onSubmit(form.getValues())}>
                                    <FaCheck size={15}></FaCheck>
                                </TaskButton>
                            </div>
                        </div>
                        <div className="text-lg w-full">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Description</FormLabel> */}
                                        <FormControl>
                                            <Textarea {...field} value={taskItem.description}></Textarea>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className="text-lg w-full">
                            <FormField
                                control={form.control}
                                name="schedule"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Description</FormLabel> */}
                                        <FormControl>
                                            <Select options={scheduleTypes}></Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};
