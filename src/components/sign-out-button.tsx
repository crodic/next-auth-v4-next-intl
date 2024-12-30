'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/auth/login');
    };

    return <Button onClick={handleSignOut}>Log Out</Button>;
};

export default SignOutButton;
