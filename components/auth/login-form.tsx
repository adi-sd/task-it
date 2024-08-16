"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { LoginSchema } from "@/schemas";

import { login } from "@/actions/login";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/commons/card-wrapper";
import { FormError } from "@/components/messages/form-error";
import { FormSuccess } from "@/components/messages/form-success";

interface LoginFormProps {
    handleSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSwitchToRegister }) => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "";
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Account with the same email already exists! Please log in with a different email!"
            : null;

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome Back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            backButtonOnclick={handleSwitchToRegister}
            showSocial
        >
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                            disabled={isPending}
                                        ></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                        ></Input>
                                    </FormControl>
                                    <Button size="sm" variant="link" asChild className="px-0 font-normal">
                                        <Link href={"/auth/reset"}>Forgot Password?</Link>
                                    </Button>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    {error ? <FormError message={error}></FormError> : null}
                    {urlError ? <FormError message={urlError}></FormError> : null}
                    {success ? <FormSuccess message={success}></FormSuccess> : null}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
