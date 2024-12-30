import { Metadata } from 'next';
import LoginForm from './_components/login-form';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
};

const Page = () => {
    return (
        <main className="h-screen flex justify-center items-center">
            <LoginForm />
        </main>
    );
};

export default Page;
