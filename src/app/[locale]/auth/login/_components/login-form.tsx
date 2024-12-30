/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useRouter } from '@/i18n/routing';
import { Separator } from '@/components/ui/separator';
import { login } from '@/actions/auth';

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isShow2fa, setIsShow2fa] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
            code: '',
        },
    });

    const onSubmit = async (data: LoginSchema) => {
        setErrorMessage(null);
        // try {
        //     if (data.code && data.code === '123456') {
        //         const authLogin = await signIn('credentials', { ...data, redirect: false });
        //         if (authLogin?.error) {
        //             setErrorMessage(authLogin.error);
        //         } else {
        //             router.push('/profile');
        //         }
        //     } else if (data.code && data.code !== '123456') {
        //         setErrorMessage('Invalid code');
        //     } else {
        //         const authLogin = await login(data);
        //         const isEnabled2fa = true;
        //         if (!isEnabled2fa) {
        //             const nextAuthLogin = await signIn('credentials', { ...data, redirect: false });
        //             if (nextAuthLogin?.error) {
        //                 setErrorMessage(nextAuthLogin.error);
        //             } else {
        //                 router.push('/profile');
        //             }
        //         } else {
        //             setIsShow2fa(true);
        //         }
        //     }
        // } catch (error: any) {
        //     setErrorMessage(error.message);
        // }

        const login = await signIn('credentials', { ...data, redirect: false });
        if (login?.error) {
            if (login.error === 'AccessDenied') {
                router.push('/auth/2fa');
            } else {
                setErrorMessage(login.error);
            }
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
                        {!isShow2fa && (
                            <>
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
                            </>
                        )}
                        {isShow2fa && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>OTP Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your 2FA code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
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
