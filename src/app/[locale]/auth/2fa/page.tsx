'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { useState } from 'react';

const Page = () => {
    const [value, setValue] = useState('');

    return (
        <main className="h-screen flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>2FA Verify</CardTitle>
                </CardHeader>
                <CardContent>
                    <InputOTP maxLength={4} value={value} onChange={setValue}>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTP>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Submit</Button>
                </CardFooter>
            </Card>
        </main>
    );
};

export default Page;
