'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CardProps = React.ComponentProps<typeof Card>;

export const LogInSection = ({ className, ...props }: CardProps) => {
  const router = useRouter();
  return (
    <div className='bg-[#EAEBFA] flex items-center justify-center w-full min-h-screen pt-20 dark:bg-[#1a1a2e]'>
      <div className='flex flex-col items-center justify-center gap-3 px-3'>
        <Card className={cn('max-w-[480px] w-full', className)} {...props}>
          <CardHeader>
            <CardTitle>Та утасны дугаараа оруулна уу!</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='flex flex-col gap-2'>
              <h1>Утасны дугаар</h1>
              <input
                type='text'
                placeholder='Утасны дугаар'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1>Нууц үг</h1>
              <input
                type='text'
                placeholder='Утасны дугаар'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full'>
              <Check /> Нэвтрэх
            </Button>
          </CardFooter>
        </Card>
        <div className='flex items-center text-sm text-gray-500 gap-2'>
          <p>Хэрэв та бүртгэлгүй бол бүртгүүлнэ үү!</p>
          <button
            className='text-black decoration-1 dark:text-white'
            onClick={() => router.push('/sign-up')}
          >
            Бүртгүүлэх
          </button>
        </div>
      </div>
    </div>
  );
};
