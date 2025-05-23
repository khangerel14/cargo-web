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
import axios from 'axios';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

type CardProps = React.ComponentProps<typeof Card>;

export const SignUpSection = ({ className, ...props }: CardProps) => {
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          phoneNumber,
          password,
          name,
          role: 'user',
        }
      );

      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.data.role));
        localStorage.setItem(
          'phoneNumber',
          JSON.stringify(response.data.data.user.phoneNumber)
        );
        toast.success(response.data.message ?? 'Sign up successful!');
        router.push('/information');
      } else {
        toast.error(response.data.message ?? 'Sign up failed!');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message;
          const errorDetails = error.response?.data.error;

          toast.error(
            message ?? 'Sign up failed. Please check your credentials.'
          );
          toast.error(
            errorDetails ?? 'Sign up failed. Please check your credentials.'
          );
        } else {
          console.error('Unexpected error:', error);
          toast.error('Something went wrong during sign-up.');
        }
      }
    }
  };

  return (
    <div className='bg-[#EAEBFA] flex items-center justify-center w-full min-h-screen pt-20 dark:bg-[#1a1a2e]'>
      <div className='flex flex-col items-center justify-center gap-3 px-3'>
        <Card className={cn('max-w-[480px] w-full', className)} {...props}>
          <CardHeader>
            <CardTitle>Та бүртгүүлнэ үү!</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='flex flex-col gap-2'>
              <h1>Нэр</h1>
              <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                placeholder='Нэр'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1>Утасны дугаар</h1>
              <input
                type='text'
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='Утасны дугаар'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1>Нууц үг</h1>
              <input
                type='text'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Утасны дугаар'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='w-full' onClick={handleSignUp}>
              <Check /> Бүртгүүлэх
            </Button>
          </CardFooter>
        </Card>
        <div className='flex items-center text-sm text-gray-500 gap-2'>
          <p>Хэрэв та бүртгэлтэй бол нэвтэрнэ үү!</p>
          <button
            className='text-black decoration-1 dark:text-white'
            onClick={() => router.push('log-in')}
          >
            Нэвтрэх
          </button>
        </div>
      </div>
    </div>
  );
};
