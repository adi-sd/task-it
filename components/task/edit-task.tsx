"use client";

import { MutableRefObject, useEffect, useRef, useState, useTransition } from "react";
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
    toggleEdit: (value: boolean, currentTaskValue: TaskItem) => void;
    taskItem: TaskItem;
}

export const EditTask: React.FC<EditTaskProps> = ({ toggleEdit, taskItem }) => {
    const headlineRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const scheduleRef = useRef<HTMLSelectElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const refArray = [headlineRef, descriptionRef, scheduleRef, submitButtonRef];

    const [isHidden, setIsHidden] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [updatedTask, setUpdatedTask] = useState(taskItem);

    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
    });

    const onSubmit = () => {
        startTransition(() => {
            console.log("submitted value - ", updatedTask);
            setUpdatedTask(updatedTask);
            setIsHidden(!isHidden); // Setting isEdit(Parent) to exact value of if Edit Task is showing
            toggleEdit(isHidden, updatedTask);
        });
    };

    // useEffect(() => {
    //     console.log("oldTask - ", taskItem);
    //     console.log("newTask - ", tempTask);
    // });

    const handleEnterKeyDown = (event: any, currentReference: MutableRefObject<any>) => {
        if (event.key === "ArrowDown") {
            let currentRefIdx = refArray.indexOf(currentReference);
            if (currentRefIdx === -1) return;
            let nextRefIdx = currentRefIdx + 1;
            if (nextRefIdx === refArray.length) nextRefIdx == 3;
            refArray[nextRefIdx].current?.focus();
        }
    };

    useEffect(() => {
        headlineRef.current?.focus();
    }, []);

    return (
        <div className="w-full h-full rounded-xl drop-shadow-lg flex flex-col" hidden={isHidden}>
            {/* <div className="font-semibold text-neutral-600 flex items-center">
                    <span>Edit - {taskItem.id}</span>
                </div> */}
            <Form {...form}>
                <form>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex w-full">
                            <FormField
                                control={form.control}
                                name="headline"
                                render={({ field }) => (
                                    <FormItem className="w-full mr-4">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                ref={headlineRef}
                                                onKeyDown={(e) => handleEnterKeyDown(e, headlineRef)}
                                                type="headline"
                                                className="text-neutral-600"
                                                value={updatedTask.headline}
                                                onChange={(e) => {
                                                    setUpdatedTask({ ...updatedTask, headline: e.target.value });
                                                }}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            ></FormField>
                            <div className="ml-auto flex gap-x-2">
                                <Button
                                    disabled={isPending}
                                    onClick={() => onSubmit()}
                                    ref={submitButtonRef}
                                    onKeyDown={(e) => handleEnterKeyDown(e, submitButtonRef)}
                                >
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
                                                ref={descriptionRef}
                                                onKeyDown={(e) => handleEnterKeyDown(e, descriptionRef)}
                                                value={updatedTask.description}
                                                onChange={(e) => {
                                                    setUpdatedTask({ ...updatedTask, description: e.target.value });
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
                                                ref={scheduleRef}
                                                onKeyDown={(e) => handleEnterKeyDown(e, scheduleRef)}
                                                options={scheduleTypeOptions}
                                                value={updatedTask.schedule}
                                                onChange={(e) => {
                                                    setUpdatedTask({
                                                        ...updatedTask,
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
