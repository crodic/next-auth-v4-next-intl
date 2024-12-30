import { Link } from '@/i18n/routing';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function HomePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const t = await getTranslations('HomePage');
    const session = await getServerSession(authOptions);
    return (
        <main className="h-screen flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>{t('about')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {session?.user ? (
                        <Link href="/shared-profile" className="text-blue-500 hover:underline">
                            My Profile
                        </Link>
                    ) : (
                        <Link href="/auth/login">{t('sign_in')}</Link>
                    )}
                </CardContent>
                {searchParams.error && (
                    <CardFooter>
                        {searchParams.error && <p className="text-red-500">{searchParams.error}</p>}
                    </CardFooter>
                )}
            </Card>
        </main>
    );
}
