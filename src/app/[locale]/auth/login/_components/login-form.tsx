'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loginSchema, LoginSchema } from '@/validation/login.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginSchema) => {
        const login = await signIn('credentials', { ...data, redirect: false });
        if (login?.error) {
            setErrorMessage(login.error);
        } else {
            router.push('/profile');
        }
    };

    const handleGithubLogin = async () => {
        await signIn('github', { callbackUrl: '/profile' });
    };

    return (
        <Card className="max-w-lg">
            <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Please enter your email and password to log in.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Separator />
                        <Button type="button" onClick={handleGithubLogin} className="w-full" variant="outline">
                            Continue with Github
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
