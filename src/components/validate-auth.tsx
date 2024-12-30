'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ValidateAuth = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            if (session?.user.error) {
                await signOut({ redirect: false });
                const errorMessage = encodeURIComponent('Session Expired');
                router.push(`/auth/login?error=${errorMessage}`);
            }
        };

        handleLogout();
    }, [session, router]);

    return <>{children}</>;
};

export default ValidateAuth;
