'use client';
import { getProfile } from '@/actions/auth';
import SignOutButton from '@/components/sign-out-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from '@/i18n/routing';
import { UserLogin } from '@/types/auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CardInfo = () => {
    const { data: session, status, update } = useSession();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserLogin | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const { data: user } = await getProfile();
                setUser(user);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        getUser();
    }, [session]);

    return (
        <Card className="max-w-lg">
            <CardHeader>
                <CardTitle>
                    {status === 'authenticated' ? session.user.role + ' ' + session.user.id : 'Loading...'}
                </CardTitle>
                <CardDescription>Client Side Rendering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {loading ? (
                    <div className="space-y-1">
                        <Skeleton className="h-8 w-72" />
                        <Skeleton className="h-8 w-80" />
                        <Skeleton className="h-8 w-50" />
                    </div>
                ) : (
                    <div>
                        <p>
                            Name: {user?.firstName} {user?.lastName}
                        </p>
                        <p>Email: {user?.email}</p>
                        <p>Gender: {user?.gender.toUpperCase()}</p>
                        <p>Role: {session?.user.role}</p>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <Button onClick={() => update({ role: 'ADMIN' })}>UPDATE ROLE</Button>
                    {session?.user.role === 'ADMIN' && <Button onClick={() => router.push('/admin')}>DASHBOARD</Button>}
                </div>
            </CardContent>
            <CardFooter className="justify-between">
                <Link href="/shared-profile" className="text-sm text-blue-500 hover:underline">
                    Server Side Profile
                </Link>
                {status === 'authenticated' ? <SignOutButton /> : <p>Loading...</p>}
            </CardFooter>
        </Card>
    );
};

export default CardInfo;
