import SignOutButton from '@/components/sign-out-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/authOptions';
import { UserLogin } from '@/types/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const Page = async () => {
    const session = await getServerSession(authOptions);
    const user: UserLogin = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        next: { revalidate: 60 },
    }).then((res) => res.json());

    return (
        <main className="h-screen flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        SEO {user?.firstName} {user?.lastName} - {user.gender.toUpperCase()} - {session?.user.role}
                    </CardTitle>
                    <CardDescription>Server Side Rendering</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/profile" className="text-sm text-blue-500 hover:underline">
                        Client Side Profile
                    </Link>
                </CardContent>
                <CardFooter>
                    <SignOutButton />
                </CardFooter>
            </Card>
        </main>
    );
};

export default Page;
