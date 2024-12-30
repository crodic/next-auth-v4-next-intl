import SignOutButton from '@/components/sign-out-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Link from 'next/link';

const Page = async () => {
    const t = await getTranslations('AdminPage');
    const session = await getServerSession(authOptions);
    const headerList = headers();
    const pathname = headerList.get('x-current-path');

    if (!session) return <main className="h-screen flex justify-center items-center">Unauthorized</main>;
    return (
        <main className="h-screen flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome back {session.user.role}</CardTitle>
                    <CardDescription>{t('title')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Current Path: {pathname}</p>
                </CardContent>
                <CardFooter className="gap-2">
                    <SignOutButton />
                    <Button variant="outline">
                        <Link href="/">Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
};

export default Page;
