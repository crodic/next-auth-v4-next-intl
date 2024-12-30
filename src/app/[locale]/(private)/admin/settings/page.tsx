import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Page = () => {
    return (
        <main className="h-screen flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your account settings.</CardDescription>
                </CardHeader>
            </Card>
        </main>
    );
};

export default Page;
