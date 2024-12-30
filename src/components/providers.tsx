'use client';

import { SessionProvider } from 'next-auth/react';
import ValidateAuth from './validate-auth';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ValidateAuth>{children}</ValidateAuth>
        </SessionProvider>
    );
};

export default Providers;
