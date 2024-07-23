"use client";

import { useEffect, useState, useTransition } from "react";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Select } from "../commons/select";
import { scheduleTypeOptions, ScheduleTypes, TaskItem } from "@/lib/types";
import { TaskSchema } from "@/schemas";
import { Button } from "../ui/button";

interface EditTaskProps {
    toggleEdit: (value: boolean) => void;
    taskItem: TaskItem;
}

export const EditTask: React.FC<EditTaskProps> = ({ toggleEdit, taskItem }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [tempTask, setTempTask] = useState(taskItem);

    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
    });

    const onDoneClicked = () => {
        console.log("Clicked Done from Edit Task!");
        setIsHidden(!isHidden);
        toggleEdit(isHidden); // Setting isEdit(Parent) to exact value of if Edit Task is showing
    };

    const onSubmit = () => {
        startTransition(() => {
            console.log("submitted value - ", tempTask);
        });
    };

    // useEffect(() => {
    //     console.log("oldTask - ", taskItem);
    //     console.log("newTask - ", tempTask);
    // });

    return (
        <div className="w-full h-fit p-4 bg-green-200 rounded-xl drop-shadow-lg flex flex-col" hidden={isHidden}>
            {/* <div className="font-semibold text-neutral-600 flex items-center">
                    <span>Edit - {taskItem.id}</span>
                </div> */}
            <Form {...form}>
                <form onSubmit={() => form.handleSubmit(onSubmit)}>
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
                                                className="text-neutral-600"
                                                value={tempTask.headline}
                                                onChange={(e) => {
                                                    setTempTask({ ...tempTask, headline: e.target.value });
                                                }}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                            <div className="ml-auto flex gap-x-2">
                                <Button disabled={isPending} onClick={() => onSubmit()}>
                                    <FaCheck size={15}></FaCheck>
                                </Button>
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
                                            <Textarea
                                                {...field}
                                                value={tempTask.description}
                                                onChange={(e) => {
                                                    setTempTask({ ...tempTask, description: e.target.value });
                                                }}
                                            ></Textarea>
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
                                            <Select
                                                {...field}
                                                options={scheduleTypeOptions}
                                                value={tempTask.schedule}
                                                onChange={(e) => {
                                                    setTempTask({
                                                        ...tempTask,
                                                        schedule: e.target.value as ScheduleTypes,
                                                    });
                                                }}
                                            ></Select>
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
