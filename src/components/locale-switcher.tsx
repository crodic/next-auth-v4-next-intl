'use client';
import { useRouter, Locale, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const LocaleSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(value: Locale) {
        const nextLocale = value as Locale;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }
    return (
        <Select defaultValue={locale} onValueChange={onSelectChange} disabled={isPending}>
            <SelectTrigger>
                <SelectValue placeholder={locale} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Vietnamese</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default LocaleSwitcher;
